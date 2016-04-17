<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/3/15
 * Time: 4:51 PM
 */

namespace Bux\AccountBundle\Controller;

use APY\DataGridBundle\Grid\Column\DateTimeColumn;
use APY\DataGridBundle\Grid\Column\TextColumn;
use APY\DataGridBundle\Grid\Source\Entity;
use Bux\AccountBundle\Form\Type\Referrals\BuyReferralsFormType;
use Bux\AccountBundle\Form\Type\Referrals\RentReferralsFormType;
use Bux\Admin\MembersBundle\Grid\Column\CountryColumn;
use Bux\Admin\SetupBundle\Entity\BuyReferralsSettingsPackages;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class ReferralsController
 *
 * @package Bux\AccountBundle\Controller
 */
class ReferralsController extends Controller
{
    /**
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @Route("/direct-referrals", name="office_account_direct_referrals")
     */
    public function directReferralsAction()
    {
        $source = new Entity('BuxUserBundle:User');
        $grid = $this->get('grid');
        $tableAlias = $source->getTableAlias();

        $user = $this->getUser();

        $source->manipulateQuery(
            function ($query) use ($tableAlias, $user)
            {
                /* @var $query \Doctrine\ORM\QueryBuilder */
                $query
                    ->andWhere($tableAlias . '.sponsor = :user')
                    ->setParameter('user', $user);
            }
        );
        $grid->setSource($source);

        $grid->hideColumns(array(
            'id',
            'usernameCanonical',
            'emailCanonical',
            'enabled',
            'salt',
            'password',
            'lastLogin',
            'confirmationToken',
            'passwordRequestedAt',
            'locked',
            'expired',
            'credentialsExpired',
            'credentialsExpireAt',
            'fullName',
            'roles',
            'expiresAt',
            'country',
            'autoSerfSeconds',
            'membershipEndDate'
        ));
        $grid->hideFilters();

        $grid->getColumn('username')->setTitle($this->get('translator')->trans('frontend.account.referrals.referral'));
        $grid->getColumn('email')->setTitle($this->get('translator')->trans('frontend.settings.form.email'));
        $grid->getColumn('registrationDate')->setTitle($this->get('translator')->trans('frontend.settings.form.register_date'));
        $grid->getColumn('country')->setTitle($this->get('translator')->trans('frontend.account.referrals.country'));

        $country = new CountryColumn(array(
            'id'    => 'country',
        ));
        $country->setTitle($this->get('translator')->trans('frontend.account.referrals.country'));
        $grid->addColumn($country);

        $membership = new TextColumn(array(
            'id'        => 'membership',
            'field'     => 'membership.name',
            'title'     => $this->get('translator')->trans('frontend.account.referrals.membership'),
            'source'    => true
        ));
        $grid->addColumn($membership, 21);

        return $grid->getGridResponse('BuxAccountBundle:Referrals:direct_referrals.html.twig');
    }

    /**
     * @return mixed
     *
     * @Route("/rented-referrals", name="office_account_rented_referrals")
     */
    public function rentedReferralsAction()
    {
        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();
        $source = new Entity('BuxAdminUtilitiesBundle:ReferralBot');
        $grid = $this->get('grid');
        $tableAlias = $source->getTableAlias();

        $source->manipulateQuery(
            function ($query) use ($tableAlias)
            {
                /* @var $query \Doctrine\ORM\QueryBuilder */
                $query
                    ->andWhere($tableAlias . '.user = :user')
                    ->setParameter('user', $this->getUser());
            }
        );
        $grid->setSource($source);

        $grid->hideColumns(array(
            'id'
        ));
        $grid->hideFilters();

        $grid->getColumn('name')->setTitle($this->get('translator')->trans('frontend.account.referrals.referral'));

        $refSince = new DateTimeColumn(array(
            'id'        => 'refsince',
            'field'     => 'statistic.refSince',
            'title'     => 'Ref Since',
            'source'    => true
        ));
        $grid->addColumn($refSince);

        $expires = new TextColumn(array(
            'id'        => 'expires',
            'field'     => 'statistic.refSince',
            'title'     => 'Expires',
            'source'    => true
        ));
        $expires->manipulateRenderCell(
            function($value, $row, $router) use ($em) {
//                $membership = $em->getRepository('BuxUserBundle:Membership')->findOneBy(array());
//                dump($value);exit;
                return 2;
            }
        );
        $grid->addColumn($expires);

        $totalActions = new TextColumn(array(
            'id'        => 'clicks',
            'field'     => 'statistic.id',
            'title'     => 'Total Actions',
            'source'    => true
        ));
        $totalActions->manipulateRenderCell(
            function($value, $row, $router) use ($em) {
                $statistic = $em->getRepository('BuxStatisticBundle:ReferralBotStatistic')->find($value);

                return $statistic->getClicks() + $statistic->getVideos() + $statistic->getPolls();
            }
        );
        $grid->addColumn($totalActions);

        return $grid->getGridResponse('BuxAccountBundle:Referrals:rented_referrals.html.twig');
    }

    /**
     * @param Request $request
     *
     * @return array
     *
     * @Route("/rent-referrals", name="office_account_rent_referrals")
     * @Template("BuxAccountBundle:Referrals:rent_referrals.html.twig")
     */
    public function rentReferralsAction(Request $request)
    {
        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();

        $form = $this->createForm(new RentReferralsFormType($this->getUser(), $em));

        if ($request->isMethod('POST')) {
            $form->handleRequest($request);
            if ($form->isValid()) {
                $package = $form->get('package')->getData();
                $user = $this->getUser();
                $wallet = $user->getPurchaseWallet();
                $qb = $em->getRepository('BuxUserBundle:ReferralPrice')->createQueryBuilder('rp');
                $qb
                    ->where('rp.membership = :membership')
                    ->andWhere('rp.minRef <= :number')
                    ->andWhere('rp.maxRef >= :number')
                    ->setParameter('membership', $user->getMembership())
                    ->setParameter('number', $package);
                $refPrice = $qb->getQuery()->getSingleResult();
                $price =$refPrice->getMonthly();
                if ($wallet->getSum() >= ($price * $package)) {
                    $bots = $em->getRepository('BuxAdminUtilitiesBundle:ReferralBot')->findBy(array(
                        'user'  => null,
                    ));
                    if (count($bots) > $package) {
                        $date = new \DateTime();
                        for ($i = 0; $i < $package; $i++) {
                            $bots[$i]->setUser($user);
                            $statistic = $bots[$i]->getStatistic();
                            $statistic->setRefSince($date);
                        }
                        $wallet->setSum($wallet->getSum() - ($price * $package));
                        $em->flush();

                        $this->get('session')->getFlashBag()->add(
                            'success',
                            $this->get('translator')->trans('frontend.account.action.buy_referrals_success')
                        );
                    } else {
                        $this->get('session')->getFlashBag()->add(
                            'error',
                            $this->get('translator')->trans('frontend.account.action.no_referrals')
                        );
                    }
                } else {
                    $this->get('session')->getFlashBag()->add(
                        'error',
                        $this->get('translator')->trans('frontend.account.action.not_have_enough_funds')
                    );
                }
            }

        }

        return array(
            'form'  => $form->createView()
        );
    }

    /**
     * @param Request $request
     *
     * @return array
     *
     * @Route("/buy-referrals", name="office_account_buy_referrals")
     * @Template("BuxAccountBundle:Referrals:buy_referrals.html.twig")
     */
    public function buyReferralsAction(Request $request)
    {
        $form = $this->createForm(new BuyReferralsFormType());

        if ($request->isMethod('POST')) {
            $form->handleRequest($request);
            if ($form->isValid()) {
                /* @var $package BuyReferralsSettingsPackages */
                $package = $form->get('package')->getData();

                $user = $this->getUser();
                $wallet = $user->getPurchaseWallet();

                if ($wallet->getSum() < $package->getPrice()) {
                    $this->get('session')->getFlashBag()->add(
                        'error',
                        $this->get('translator')->trans('frontend.account.action.not_have_enough_funds')
                    );
                } else {
                    $role = array();
                    /* @var $em EntityManager */
                    $em = $this->getDoctrine()->getManager();
                    $qb = $em->getRepository('BuxUserBundle:User')->createQueryBuilder('u');
                    $qb
                        ->where("u.sponsor IS NULL")
                        ->andWhere('u.roles = :role')
                        ->andWhere('u.id != :userId')
                        ->setParameter('role', serialize($role))
                        ->setParameter('userId', $user->getId());
                    $referrals =$qb->getQuery()->getResult();
                    if (count($referrals) < $package->getReferrals()) {
                        $this->get('session')->getFlashBag()->add(
                            'error',
                            $this->get('translator')->trans('frontend.account.action.no_referrals')
                        );
                    } else {
                        for ($i = 0; $i < $package->getReferrals(); $i++) {
                            $referrals[$i]->setSponsor($user);
                        }
                        $wallet->setSum($wallet->getSum() - $package->getPrice());
                        $em->flush();

                        $this->get('session')->getFlashBag()->add(
                            'success',
                            $this->get('translator')->trans('frontend.account.action.buy_referrals_success')
                        );
                    }

                }
            }
        }

        return array(
            'form'  => $form->createView()
        );
    }
}