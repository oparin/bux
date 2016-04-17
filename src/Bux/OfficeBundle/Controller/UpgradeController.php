<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/23/15
 * Time: 10:40 AM
 */

namespace Bux\OfficeBundle\Controller;

use Bux\AccountBundle\Form\Type\AddFundsFormType;
use Bux\OfficeBundle\Form\Type\Upgrade\UpgradeStatusFormType;
use Bux\OfficeBundle\Form\Type\Upgrade\UpgradeStatusPaymentFormType;
use Bux\UserBundle\Entity\Membership;
use Bux\UserBundle\Entity\User;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class UpgradeController
 *
 * @package Bux\OfficeBundle\Controller
 *
 * @Route("/upgrade")
 */
class UpgradeController extends Controller
{
    /**
     * @param Request $request
     *
     * @return array
     *
     * @Route("/", name="office_upgrade")
     * @Template("BuxOfficeBundle:Upgrade:index.html.twig")
     */
    public function indexAction(Request $request)
    {
        $form = $this->createForm(new UpgradeStatusFormType($this->getUser()));

        $formPayment = $this->createForm(new UpgradeStatusPaymentFormType($this->getUser()), null);

        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();

        $memberships = $em->getRepository('BuxUserBundle:Membership')->findAll();

        if ($request->isMethod('POST')) {
            $parameters = $request->request->all();
            if (isset($parameters['upgrade_status_form_type'])) {
                $form->handleRequest($request);
                if ($form->isValid()) {
                    /* @var $membership Membership */
                    $membership = $form->get('status')->getData();

                    /* @var $user User */
                    $user = $this->getUser();
                    $wallet = $user->getPurchaseWallet();

                    if ($wallet->getSum() < $membership->getPrice()) {
                        $this->get('session')->getFlashBag()->add(
                            'error',
                            $this->get('translator')->trans('frontend.advertise.form.you_not_funds.')
                        );
                    } else {
                        $wallet->setSum($wallet->getSum() - $membership->getPrice());
                        $user->setMembership($membership);

                        $date = new \DateTime();
                        if ($user->getMembershipEndDate() > $date) {
                            $newDate = $user->getMembershipEndDate();
                            $newDate->modify('+ ' . $membership->getDuration() . 'day');
                            $user->setMembershipEndDate(null);
                            $em->flush();
                            $user->setMembershipEndDate($newDate);
                        } else {
                            $user->setMembershipEndDate(null);
                            $em->flush();
                            $user->setMembershipEndDate($date->modify('+ ' . $membership->getDuration() . 'day'));
                        }

                        $user->getBannerCredits()->setCredits($user->getBannerCredits()->getCredits() + $membership->getBannerCredits());
                        $user->getBigBannerCredits()->setCredits($user->getBigBannerCredits()->getCredits() + $membership->getVipBannerCredits());
                        $user->getAutoSerfCredits()->setCredits($user->getAutoSerfCredits()->getCredits() + $membership->getAutosurfCredits());

                        if ($sponsor = $user->getSponsor()) {
                            $sponsorWallet = $sponsor->getWallet();
                            $sponsorWallet->setSum($sponsorWallet->getSum() + $membership->getPrice() * $sponsor->getMembership()->getUpgradeComission() / 100);
                        }

                        $em->flush();

                        $this->get('session')->getFlashBag()->add(
                            'success',
                            $this->get('translator')->trans('frontend.upgrade.form.upgrade_success')
                        );

                        return $this->redirect($this->generateUrl('office_upgrade'));
                    }
                }
            }

            if (isset($parameters['upgrade_status_payment_form_type'])) {
                $formPayment->handleRequest($request);
                if ($formPayment->isValid()) {
                    $paymentMethod  = $formPayment->get('method')->getData();
                    $membership     = $formPayment->get('status')->getData();

                    $session    = $this->get('session');
                    $session->set('membership_id', $membership->getId());

                    switch ($paymentMethod->getName()) {
                        case 'Perfect Money':
                            return $this->redirect($this->generateUrl('office_upgrade_perfect_money'));
                            break;
                        case 'Payeer':
                            return $this->redirect($this->generateUrl('office_account_add_funds_payeer'));
                            break;
                    }
                }
            }
        }

        return array(
            'form'          => $form->createView(),
            'form_payment'  => $formPayment->createView(),
            'memberships'   => $memberships
        );
    }

    /**
     * @Route("/perfect-money", name="office_upgrade_perfect_money")
     * @Template("BuxOfficeBundle:Upgrade:pm.html.twig")
     */
    public function upgradePerfectMoney()
    {
        $session        = $this->get('session');
        $membershipId   = $session->get('membership_id');

        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();

        $membership     = $em->getRepository('BuxUserBundle:Membership')->find($membershipId);

        $settings = $em->getRepository('BuxAdminSetupBundle:PaymentGateways\PerfectMoneySettings')->find(1);

        return array(
            'setting'   => $settings,
            'sum'       => $membership->getPrice(),
            'name'      => 'OJOOAD',
            'status'    => $this->getUser()->getfullName()
        );
    }
}