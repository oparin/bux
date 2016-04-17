<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/6/15
 * Time: 11:44 AM
 */

namespace Bux\Admin\MembersBundle\Controller;

use APY\DataGridBundle\Grid\Action\DeleteMassAction;
use APY\DataGridBundle\Grid\Action\MassAction;
use APY\DataGridBundle\Grid\Action\RowAction;
use APY\DataGridBundle\Grid\Column\TextColumn;
use APY\DataGridBundle\Grid\Source\Entity;
use Bux\Admin\MembersBundle\Form\Type\EditMemberFormType;
use Bux\Admin\MembersBundle\Grid\Column\CountryColumn;
use Bux\Admin\MembersBundle\Grid\Column\SurveyColumn;
use Bux\Admin\MembersBundle\Grid\Column\WalletColumn;
use Bux\AdvertiseBundle\Entity\AutoSerfCredits;
use Bux\AdvertiseBundle\Entity\BannerCredits;
use Bux\AdvertiseBundle\Entity\BigBannerCredits;
use Bux\AdvertiseBundle\Entity\PollCredits;
use Bux\AdvertiseBundle\Entity\VideoCredits;
use Bux\BlogBundle\Entity\BlogUserSettings;
use Bux\UserBundle\Entity\User;
use Bux\WalletBundle\Entity\UserPaymentAccount;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class MembersController
 *
 * @package Bux\Admin\MembersBundle\Controller
 *
 * @Route("/members")
 */
class MembersController extends Controller
{
    /**
     * @return array
     *
     * @Route("/members/manage", name="admin_members_manage_members")
     */
    public function manageMembersAction()
    {
        $source     = new Entity('BuxUserBundle:User');
        $grid       = $this->get('grid');
        $tableAlias = $source->getTableAlias();

        $source->manipulateQuery(
            function ($query) use ($tableAlias)
            {
                /* @var $query \Doctrine\ORM\QueryBuilder */
                $query
                    ->andWhere($tableAlias . '.roles <> :roles')
                    ->andWhere($tableAlias . '.roles <> :fake')
                    ->orderBy($tableAlias . '.id', 'DESC')
                    ->setParameter('roles', serialize(array('ROLE_ADMIN')))
                    ->setParameter('fake', serialize(array('ROLE_FAKE')));
            }
        );

        $grid->setSource($source);
        $grid->hideColumns(array(
            'id',
            'usernameCanonical',
            'emailCanonical',
            'salt',
            'password',
            'confirmationToken',
            'passwordRequestedAt',
            'expired',
            'expiresAt',
            'credentialsExpired',
            'credentialsExpired',
            'credentialsExpireAt',
            'roles',
            'locked',
            'fullName',
            'registrationDate',
            'lastLogin',
            'country',
            'autoSerfSeconds'
        ));

        $grid->getColumn('username')->setTitle('Username');
        $grid->getColumn('email')->setTitle('Email');
        $grid->getColumn('enabled')->setTitle('Status');

        $membership = new TextColumn(array(
            'id'    => 'membership',
            'field' => 'membership.name',
            'title' => 'Membership',
            'source'    => true
        ));

        $grid->addColumn($membership, 5);

        $membership = new TextColumn(array(
            'id'    => 'sponsor',
            'field' => 'sponsor.username',
            'title' => 'Sponsor',
            'source'    => true
        ));

        $grid->addColumn($membership, 5);

        $wallet = new WalletColumn(array(
            'title' => 'Balance / Purchase',
        ));
        $wallet->manipulateRenderCell(
            function($value, $row, $router) {
                /* @var $entity \Bux\UserBundle\Entity\User */
                $entity = $row->getEntity();

                return array('balance' => $entity->getWallet()->getSum(), 'purchase' => $entity->getPurchaseWallet()->getSum());
            }
        );
        $grid->addColumn($wallet, 6);

        $survey = new SurveyColumn(array(
            'title' => 'Hold / Available',
        ));
        $survey->manipulateRenderCell(
            function($value, $row, $router) {
                /* @var $entity \Bux\UserBundle\Entity\User */
                $entity = $row->getEntity();

                return array('hold' => $entity->getSurveyWalletBalance()->getSum(), 'available' => $entity->getSurveyWalletAvailableBalance()->getSum());
            }
        );
        $grid->addColumn($survey, 7);

//        $country = new CountryColumn(array(
//            'id'    => 'country',
//            'title' => 'Country',
//        ));
//        $grid->addColumn($country, 7);

        $editAction = new RowAction('edit', 'admin_members_edit_member');
        $editAction->setRouteParameters(array('id'));
        $grid->addRowAction($editAction);

        $showAction = new RowAction('show', '#');
        $showAction->setRouteParameters(array('id'));
        $grid->addRowAction($showAction);

        $loginAction = new RowAction('login', 'office_user_login');
        $loginAction->setRouteParameters(array('id'));
        $loginAction->setTarget('_blank');
        $grid->addRowAction($loginAction);

        $massAction = new DeleteMassAction(true);
        $massAction->setConfirm('sdfsdfs');
        $grid->addMassAction($massAction);

        $massAction = new MassAction('Activate', 'Bux\Admin\MembersBundle\Controller\MembersController::activateMember', true, array('em' => $this->getDoctrine()->getManager()), null);
        $grid->addMassAction($massAction);

        $massAction = new MassAction('Deactivate', 'Bux\Admin\MembersBundle\Controller\MembersController::deactivateMember', true, array('em' => $this->getDoctrine()->getManager()), null);
        $grid->addMassAction($massAction);

        return $grid->getGridResponse('BuxAdminMembersBundle:Members:user_table.html.twig');
    }

    /**
     * @param array  $primaryKeys
     * @param array  $allPrimaryKeys
     * @param string $session
     * @param array  $parameters
     */
    static public function activateMember($primaryKeys, $allPrimaryKeys, $session, $parameters)
    {
        /* @var $em EntityManager */
        $em = $parameters['em'];

        foreach ($primaryKeys as $memberId) {
            /* @var $member User */
            $member = $em->getRepository('BuxUserBundle:User')->find($memberId);
            $member->setEnabled(true);
            $em->flush();
        }
    }

    /**
     * @param array  $primaryKeys
     * @param array  $allPrimaryKeys
     * @param string $session
     * @param array  $parameters
     */
    static public function deactivateMember($primaryKeys, $allPrimaryKeys, $session, $parameters)
    {
        /* @var $em EntityManager */
        $em = $parameters['em'];

        foreach ($primaryKeys as $memberId) {
            /* @var $member User */
            $member = $em->getRepository('BuxUserBundle:User')->find($memberId);
            $member->setEnabled(false);
            $em->flush();
        }
    }

    /**
     * @param Request $request
     * @param int     $id
     *
     * @return array
     *
     * @Route("/members/edit/{id}", name="admin_members_edit_member")
     * @Template("BuxAdminMembersBundle:Members:edit_member.html.twig")
     */
    public function editMemberAction(Request $request, $id = null)
    {
        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();

        $tab = 'update';

        if ($id) {
            $member = $em->getRepository('BuxUserBundle:User')->find($id);
        } else {
            $member = null;
        }

        $form   = $this->createForm(new EditMemberFormType(), $member, array(
            'em' => $em
        ));

        if ($request->isMethod('POST')) {
            $form->handleRequest($request);
            if ($form->isValid()) {
                /* @var $user User */
                $user = $form->getData();
                if (!$id) {
                    /* @var $user User */
                    $user->setEnabled(true);
                    $user->setRegistrationDate(new \DateTime());
                    $user->getWallet()->setUser($user);
                    $user->getPurchaseWallet()->setUser($user);
                    $user->getSurveyWalletBalance()->setUser($user);
                    $user->getSurveyWalletAvailableBalance()->setUser($user);

                    $credits = new VideoCredits();
                    $credits->setUser($user);
                    $em->persist($credits);

                    $credits = new PollCredits();
                    $credits->setUser($user);
                    $em->persist($credits);

                    $credits = new AutoSerfCredits();
                    $credits->setUser($user);
                    $em->persist($credits);

                    $credits = new BannerCredits();
                    $credits->setUser($user);
                    $em->persist($credits);

                    $credits = new BigBannerCredits();
                    $credits->setUser($user);
                    $em->persist($credits);

                    $blogSettings = new BlogUserSettings();
                    $blogSettings->setUpdatedAt(new \DateTime());
                    $blogSettings->setUser($user);
                    $em->persist($blogSettings);

                    $paymentMethods = $em->getRepository('BuxWalletBundle:PaymentMethod')->findAll();
                    foreach ($paymentMethods as $paymentMethod) {
                        $userAccount = new UserPaymentAccount();
                        $userAccount->setUser($user);
                        $userAccount->setPaymentMethod($paymentMethod);
                        $em->persist($userAccount);
                    }

                    $em->persist($user);
                }
                $em->flush();

                $this->get('session')->getFlashBag()->add(
                    'success',
                    'Success!'
                );

                return $this->redirect($this->generateUrl('admin_members_manage_members'));
            }
        }

        return array(
            'tab'   => $tab,
            'form'  => $form->createView()
        );
    }
}