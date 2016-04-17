<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/6/15
 * Time: 5:01 PM
 */

namespace Bux\AccountBundle\Controller;

use Bux\AccountBundle\Form\Type\AddFundsFormType;
use Bux\StatisticBundle\Event\WalletEvent;
use Bux\StatisticBundle\StatisticEvents;
use Bux\UserBundle\Entity\User;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class AddFundsController
 *
 * @package Bux\AccountBundle\Controller
 */
class AddFundsController extends Controller
{
    /**
     * @param Request $request
     *
     * @return array
     *
     * @Route("/add-funds", name="office_account_add_funds")
     * @Template("BuxAccountBundle:AddFunds:add_funds.html.twig")
     */
    public function addFundsAction(Request $request)
    {
        $form = $this->createForm(new AddFundsFormType(), null);

        if ($request->isMethod('post')) {
            $form->handleRequest($request);

            if ($form->isValid()) {
                $sum            = $form->get('amount')->getData();
                $paymentMethod  = $form->get('method')->getData();

                $session    = $this->get('session');
                $session->set('payment_sum', $sum);

                switch ($paymentMethod) {
                    case 'balance':
                        /* @var $user User */
                        $user   = $this->getUser();
                        $wallet = $user->getWallet();

                        if ($wallet->getSum() < $sum) {
                            $this->get('session')->getFlashBag()->add(
                                'error',
                                $this->get('translator')->trans('frontend.funds_transfer.form.you_not_funds')
                            );
                        } else {
                            $wallet->setSum($wallet->getSum() - $sum);
                            $purchaseWallet = $user->getPurchaseWallet();
                            $purchaseWallet->setSum($purchaseWallet->getSum() + $sum);

                            $em = $this->getDoctrine()->getManager();
                            $em->flush();

                            $this->get('session')->getFlashBag()->add(
                                'success',
                                $this->get('translator')->trans('frontend.funds_transfer.form.transfer_success')
                            );

                            return $this->redirect($this->generateUrl('office_account'));
                        }
                        break;
                    case 'perfect_money':
                        return $this->redirect($this->generateUrl('office_account_add_funds_perfect_money'));
                        break;
                    case 'payeer':
                        return $this->redirect($this->generateUrl('office_account_add_funds_payeer'));
                        break;
                }

//                // Add balance
//                /* @var $user User */
//                $user = $this->getUser();
//                $wallet = $user->getPurchaseWallet();
//                $wallet->setSum($wallet->getSum() + $sum);
//                $em = $this->getDoctrine()->getManager();
//                $em->flush();
//
//                // Save Deposit Statistic
//                $event = new WalletEvent($user, $paymentMethod, $sum);
//                $dispatcher = $this->get('event_dispatcher');
//                $dispatcher->dispatch(StatisticEvents::PURCHASE_DEPOSIT, $event);
//
//                $this->get('session')->getFlashBag()->add(
//                    'success',
//                    $this->get('translator')->trans('frontend.account.action.add_funds_success')
//                );
//
//                return $this->redirect($this->generateUrl('office_account_add_funds'));
            } else {
                $this->get('session')->getFlashBag()->add(
                    'error',
                    $this->get('translator')->trans('frontend.account.action.error')
                );
            }
        }

        return array(
            'form'  => $form->createView()
        );
    }

    /**
     * @return array
     *
     * @Route("/add-funds/perfect-money", name="office_account_add_funds_perfect_money")
     * @Template("BuxAccountBundle:AddFunds:perfect_money.html.twig")
     */
    public function perfectMoneyAction()
    {
        $session    = $this->get('session');
        $sum        = $session->get('payment_sum');

        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();
        $settings = $em->getRepository('BuxAdminSetupBundle:PaymentGateways\PerfectMoneySettings')->find(1);

        return array(
            'setting'   => $settings,
            'sum'       => $sum,
            'name'      => 'Ojoooad'
        );
    }

    /**
     * @param Request $request
     *
     * @return Response
     *
     * @Route("/add-funds/perfect-money-success", name="office_account_add_funds_perfect_money_success")
     */
    public function perfectMoneySuccessAction(Request $request)
    {
        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();
        $settings = $em->getRepository('BuxAdminSetupBundle:PaymentGateways\PerfectMoneySettings')->find(1);

        $paymentId          = $request->request->get('PAYMENT_ID');
        $payeeAccount       = $request->request->get('PAYEE_ACCOUNT');
        $paymentAmount      = $request->request->get('PAYMENT_AMOUNT');
        $paymentUnits       = $request->request->get('PAYMENT_UNITS');
        $paymentBatchNum    = $request->request->get('PAYMENT_BATCH_NUM');
        $payerAccount       = $request->request->get('PAYER_ACCOUNT');
        $phrase             = strtoupper(md5($settings->getAlternatePassphrase()));
        $timeStampgmt       = $request->request->get('TIMESTAMPGMT');
        $v2Hash             = $request->request->get('V2_HASH');
		$payerAccount       = $request->request->get('PAYER_ACCOUNT');
		$batch              = $request->request->get('PAYMENT_BATCH_NUM');

        $string = $paymentId . ':' . $payeeAccount . ':' . $paymentAmount . ':' . $paymentUnits . ':' . $paymentBatchNum . ':' . $payerAccount . ':' . $phrase . ':' . $timeStampgmt;
        $hash = strtoupper(md5($string));

        if ($hash == $v2Hash) {
            if ($settings->getAccount() == $payeeAccount && $settings->getCurrency() == $paymentUnits) {
                /* @var $user \Bux\UserBundle\Entity\User */
                $user               = $this->getUser();
                $wallet             = $user->getPurchaseWallet();
                $date               = new \DateTime();

                if ($paymentId != "NULL") {
                    $membership = $em->getRepository('BuxUserBundle:Membership')->find($paymentId);
                    $user->setMembership($membership);

                    $user->getBannerCredits()->setCredits($user->getBannerCredits()->getCredits() + $membership->getBannerCredits());
                    $user->getBigBannerCredits()->setCredits($user->getBigBannerCredits()->getCredits() + $membership->getVipBannerCredits());
                    $user->getAutoSerfCredits()->setCredits($user->getAutoSerfCredits()->getCredits() + $membership->getAutosurfCredits());

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

                    if ($sponsor = $user->getSponsor()) {
                        $sponsorWallet = $sponsor->getWallet();
                        $sponsorWallet->setSum($sponsorWallet->getSum() + $membership->getPrice() * $sponsor->getMembership()->getUpgradeComission() / 100);
                    }
                } else {
                    $wallet->setSum($wallet->getSum() + $paymentAmount);

                    // Save Deposit Statistic
                    $paymentMethod = $em->getRepository('BuxWalletBundle:PaymentMethod')->find(1);
                    $event = new WalletEvent($user, $paymentMethod, $paymentAmount, $payerAccount, $batch);
                    $dispatcher = $this->get('event_dispatcher');
                    $dispatcher->dispatch(StatisticEvents::PURCHASE_DEPOSIT, $event);

                    $session = $this->get('session');
                    $session->remove('payment_sum');
					
					$session->getFlashBag()->add(
                            'success',
                            'Add funds completed successfully!'
                    );

                    return $this->redirect($this->generateUrl('office_account'));
                }

                $em->flush();

                return $this->redirect($this->generateUrl('office_upgrade'));
            }
        }

        return $this->redirect($this->generateUrl('office_account_add_funds'));
    }

    /**
     * @return array
     *
     * @Route("/add-funds/paypal", name="office_account_add_funds_payeer")
     * @Template("BuxAccountBundle:AddFunds:payeer.html.twig")
     */
    public function payeerAction()
    {
        $session    = $this->get('session');
        $sum        = number_format($session->get('payment_sum'), 2);

        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();
        $settings = $em->getRepository('BuxAdminSetupBundle:PaymentGateways\PayeerSettings')->find(1);

        $shop       = $settings->getShopId();
        $orderId    = $this->getUser()->getId();
        $curr       = $settings->getCurrency();
        $desc       = base64_encode('status');
        $secret     = $settings->getSecretKey();

        $arHash = array(
            $shop,
            $orderId,
            $sum,
            $curr,
            $desc,
            $secret
        );
        $sign = strtoupper(hash('sha256', implode(":", $arHash)));

        return array(
            'm_shop'    => $shop,
            'm_orderid' => $orderId,
            'm_amount'  => $sum,
            'm_curr'    => $curr,
            'm_desc'    => $desc,
            'm_sign'    => $sign,
        );
    }

    /**
     * @param Request $request
     *
     * @return array
     *
     * @Route("/add-funds/payeer-callback", name="office_account_add_funds_payeer_callback")
     * @Template("")
     */
    public function payeerCallbackAction(Request $request)
    {
        if ($request->get('m_operation_id') && $request->get('m_sign')) {
            /* @var $em EntityManager */
            $em = $this->getDoctrine()->getManager();
            $settings = $em->getRepository('BuxAdminSetupBundle:PaymentGateways\PayeerSettings')->find(1);

            $secret = $settings->getSecretKey();

            $arHash = array(
                $request->request->get('m_operation_id'),
                $request->request->get('m_operation_ps'),
                $request->request->get('m_operation_date'),
                $request->request->get('m_operation_pay_date'),
                $request->request->get('m_shop'),
                $request->request->get('m_orderid'),
                $request->request->get('m_amount'),
                $request->request->get('m_curr'),
                $request->request->get('m_desc'),
                $request->request->get('m_status'),
                $secret,
            );

            $signHash = strtoupper(hash('sha256', implode(':', $arHash)));
            if ($request->request->get('m_sign') == $signHash && $request->request->get('m_status') == 'success') {

                /* @var $user \Bux\UserBundle\Entity\User */
                $user               = $em->getRepository('BuxUserBundle:User')->find($request->request->get('m_orderid'));
                $wallet             = $user->getPurchaseWallet();
                $date               = new \DateTime();

                // Save Deposit Statistic
                $paymentMethod = $em->getRepository('BuxWalletBundle:PaymentMethod')->find(2);
                $event = new WalletEvent($user, $paymentMethod, $request->request->get('m_amount'));
                $dispatcher = $this->get('event_dispatcher');
                $dispatcher->dispatch(StatisticEvents::PURCHASE_DEPOSIT, $event);

                $wallet->setSum($wallet->getSum() + $request->request->get('m_amount'));

                $em->flush();

                $session    = $this->get('session');
                $session->remove('payment_sum');

                echo $request->request->get('m_orderid') . '|success';
                exit;
            }
            echo $request->request->get('m_orderid') . '|error';
            exit;
        }

        return array(

        );
    }

    /**
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     *
     * @Route("/add-funds/payeer-success", name="office_account_add_funds_payeer_success")
     * @Template("")
     */
    public function payeerSuccessAction(Request $request)
    {
        return $this->redirect($this->generateUrl('office_account_add_funds'));
    }
}