<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/7/15
 * Time: 5:40 PM
 */

namespace Bux\AccountBundle\Controller;

use Bux\AccountBundle\Form\Type\WithDrawFormType;
use Bux\AccountBundle\Form\Type\WithdrawPaymentMethodFormType;
use Bux\StatisticBundle\Entity\WithdrawStatistic;
use Bux\UserBundle\Entity\User;
use Bux\WalletBundle\Entity\PaymentMethod;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class CashoutController
 *
 * @package Bux\AccountBundle\Controller
 */
class CashoutController extends Controller
{
    /**
     * @param Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     *
     * @Route("/cashout", name="office_account_cashout")
     * @Template("BuxAccountBundle:Cashout:cashout.html.twig")
     */
    public function selectPaymentMethodAction(Request $request)
    {
        $form = $this->createForm(new WithdrawPaymentMethodFormType(), null);

        if ($request->isMethod('POST')) {
            $form->handleRequest($request);
            if ($form->isValid()) {
                $method = $form->get('method')->getData();
                switch ($method->getId()) {
                    case 1:
                        return $this->redirect($this->generateUrl('office_account_withdraw_perfect_money'));
                        break;
//                    case 2:
//                        return $this->redirect($this->generateUrl('office_account_withdraw_ego_pay'));
//                        break;
//                    case 3:
//                        return $this->redirect($this->generateUrl('office_account_withdraw_bitcoin'));
//                        break;
                    case 2:
                        return $this->redirect($this->generateUrl('office_account'));
                        break;
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
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     *
     * @Route("/withdraw-perfect-money", name="office_account_withdraw_perfect_money")
     * @Template("BuxAccountBundle:Cashout:withdraw.html.twig")
     */
    public function withdrawPerfectMoney(Request $request)
    {
        $acError = null;

        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();
        $paymentMethod  = $em->getRepository('BuxWalletBundle:PaymentMethod')->find(1);

        /* @var $user User */
        $user           = $this->getUser();
        $account        = $em->getRepository('BuxWalletBundle:UserPaymentAccount')->findOneBy(array(
            'user'  => $user,
            'paymentMethod' => $paymentMethod
        ));

//        $form = $this->createForm(new WithDrawFormType());

        if ($request->isMethod('POST')) {
            $accountStr = $request->request->get('account');
            $sum = $request->request->get('sum');

            if ($accountStr) {
                if ($sum <= $user->getWallet()->getSum()) {
                    $membership = $user->getMembership();
                    $settings = $membership->getWithdrawSettings();
                    $minSum = $settings->getMinPayout();
                    if ($sum >= $minSum) {
                        $date = new \DateTime();

                        $days = $settings->getCashoutTime();

                        $qb = $em->getRepository('BuxStatisticBundle:WithdrawStatistic')->createQueryBuilder('ws');
                        $qb
                            ->select('COUNT(ws.id)')
                            ->where('ws.user = :user')
                            ->andWhere('ws.date > :date')
                            ->setParameter('user', $user)
                            ->setParameter('date', $date->modify('-' . $days . 'day'));
                        $stats = $qb->getQuery()->getSingleScalarResult();

                        if ($stats < 1 || $settings->getCashoutTime() === 0) {
                            $date = new \DateTime();
                            $qb = $em->getRepository('BuxStatisticBundle:WithdrawStatistic')->createQueryBuilder('ws');
                            $qb
                                ->select('SUM(ws.amount)')
                                ->where('ws.user = :user')
                                ->andWhere('ws.date > :date')
                                ->setParameter('user', $user)
                                ->setParameter('date', $date->modify('-1 day'));
                            $amount = $qb->getQuery()->getSingleScalarResult();
                            if ($amount < $settings->getMaxInDay() || $settings->getMaxInDay() === '0.00') {
                                $this->saveWithdrawStatistic($user, $paymentMethod);

                                return $this->redirect($this->generateUrl('office_account_logs_withdraw_history'));
                            } else {
                                $this->get('session')->getFlashBag()->add(
                                    'error',
                                    $this->get('translator')->trans('frontend.account.action.error') . '. Max ' . $settings->getMaxInDay() . '$ in day'
                                );
                            }
                        } else {
                            $this->get('session')->getFlashBag()->add(
                                'error',
                                $this->get('translator')->trans('frontend.account.action.error') . '. You can withdraw once in ' . $settings->getCashoutTime() . 'days'
                            );
                        }
                    } else {
                        $this->get('session')->getFlashBag()->add(
                            'error',
                            $this->get('translator')->trans('frontend.account.action.error') . '. You do not have enough funds! (' . $minSum . '$)'
                        );
                    }
                } else {
                    $this->get('session')->getFlashBag()->add(
                        'error',
                        $this->get('translator')->trans('frontend.account.action.error') . '. No money!'
                    );
                }
            } else {
                $acError = 'Please enter your wallet in profile settings';
            }
        }

        return array(
            'payment_method'    => $paymentMethod->getName(),
            'account'           => $account,
            'ac_error'          => $acError
        );
    }

    /**
     * @param Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     *
     * @Route("/withdraw-ego-pay", name="office_account_withdraw_ego_pay")
     * @Template("BuxAccountBundle:Cashout:withdraw.html.twig")
     */
    public function withdrawEgoPay(Request $request)
    {
        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();
        $paymentMethod  = $em->getRepository('BuxWalletBundle:PaymentMethod')->find(2);
        $user           = $this->getUser();
        $account        = $em->getRepository('BuxWalletBundle:UserPaymentAccount')->findOneBy(array(
            'user'  => $user,
            'paymentMethod' => $paymentMethod
        ));

        if ($request->isMethod('POST')) {
            $this->saveWithdrawStatistic($user, $paymentMethod);

            return $this->redirect($this->generateUrl('office_account_logs_withdraw_history'));
        }

        return array(
            'payment_method'    => $paymentMethod->getName(),
            'account'           => $account,
        );
    }

    /**
     * @param Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     *
     * @Route("/withdraw-bitcoin", name="office_account_withdraw_bitcoin")
     * @Template("BuxAccountBundle:Cashout:withdraw.html.twig")
     */
    public function withdrawBitCoin(Request $request)
    {
        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();
        $paymentMethod  = $em->getRepository('BuxWalletBundle:PaymentMethod')->find(3);
        $user           = $this->getUser();
        $account        = $em->getRepository('BuxWalletBundle:UserPaymentAccount')->findOneBy(array(
            'user'  => $user,
            'paymentMethod' => $paymentMethod
        ));

        if ($request->isMethod('POST')) {
            $this->saveWithdrawStatistic($user, $paymentMethod);

            return $this->redirect($this->generateUrl('office_account_logs_withdraw_history'));
        }

        return array(
            'payment_method'    => $paymentMethod->getName(),
            'account'           => $account,
        );
    }

    /**
     * @param Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     *
     * @Route("/withdraw-payeer", name="office_account_withdraw_payeer")
     * @Template("BuxAccountBundle:Cashout:withdraw.html.twig")
     */
    public function withdrawPayeer(Request $request)
    {
        $acError = null;

        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();
        $paymentMethod  = $em->getRepository('BuxWalletBundle:PaymentMethod')->find(2);

        /* @var $user User */
        $user           = $this->getUser();
        $account        = $em->getRepository('BuxWalletBundle:UserPaymentAccount')->findOneBy(array(
            'user'  => $user,
            'paymentMethod' => $paymentMethod
        ));

//        $form = $this->createForm(new WithDrawFormType());

        if ($request->isMethod('POST')) {
            $accountStr = $request->request->get('account');
            $sum = $request->request->get('sum');

            if ($accountStr) {
                if ($sum <= $user->getWallet()->getSum()) {
                    $membership = $user->getMembership();
                    $settings = $membership->getWithdrawSettings();
                    $minSum = $settings->getMinPayout();
                    if ($sum >= $minSum) {
                        $date = new \DateTime();

                        $days = $settings->getCashoutTime();

                        $qb = $em->getRepository('BuxStatisticBundle:WithdrawStatistic')->createQueryBuilder('ws');
                        $qb
                            ->select('COUNT(ws.id)')
                            ->where('ws.user = :user')
                            ->andWhere('ws.date > :date')
                            ->setParameter('user', $user)
                            ->setParameter('date', $date->modify('-' . $days . 'day'));
                        $stats = $qb->getQuery()->getSingleScalarResult();
                        if ($stats < 1 || $settings->getCashoutTime() === 0) {
                            $date = new \DateTime();
                            $qb = $em->getRepository('BuxStatisticBundle:WithdrawStatistic')->createQueryBuilder('ws');
                            $qb
                                ->select('SUM(ws.amount)')
                                ->where('ws.user = :user')
                                ->andWhere('ws.date > :date')
                                ->setParameter('user', $user)
                                ->setParameter('date', $date->modify('-1 day'));
                            $amount = $qb->getQuery()->getSingleScalarResult();
                            if ($amount < $settings->getMaxInDay() || $settings->getMaxInDay() === '0.00') {
                                $this->saveWithdrawStatistic($user, $paymentMethod);

                                return $this->redirect($this->generateUrl('office_account_logs_withdraw_history'));
                            } else {
                                $this->get('session')->getFlashBag()->add(
                                    'error',
                                    $this->get('translator')->trans('frontend.account.action.error') . '. Max ' . $settings->getMaxInDay() . '$ in day'
                                );
                            }
                        } else {
                            $this->get('session')->getFlashBag()->add(
                                'error',
                                $this->get('translator')->trans('frontend.account.action.error') . '. You can withdraw once in ' . $settings->getCashoutTime() . 'days'
                            );
                        }
                    } else {
                        $this->get('session')->getFlashBag()->add(
                            'error',
                            $this->get('translator')->trans('frontend.account.action.error') . '. You do not have enough funds! (' . $minSum . '$)'
                        );
                    }
                } else {
                    $this->get('session')->getFlashBag()->add(
                        'error',
                        $this->get('translator')->trans('frontend.account.action.error') . '. No money!'
                    );
                }
            } else {
                $acError = 'Please enter your wallet in profile settings';
            }
        }

        return array(
            'payment_method'    => $paymentMethod->getName(),
            'account'           => $account,
            'ac_error'          => $acError
        );
    }

    /**
     * @param User          $user
     * @param PaymentMethod $paymentMethod
     */
    protected function saveWithdrawStatistic(User $user, PaymentMethod $paymentMethod)
    {
        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();
        $withdrawStatistic = new WithdrawStatistic();
        $withdrawStatistic->setDate(new \DateTime());
        $withdrawStatistic->setUser($user);
        $wallet = $user->getWallet();
        $withdrawStatistic->setAmount($wallet->getSum());
        $wallet->setSum(0);
        $withdrawStatistic->setPaymentMethod($paymentMethod);
        $account    = $em->getRepository('BuxWalletBundle:UserPaymentAccount')->findOneBy(array(
            'user'          => $user,
            'paymentMethod' => $paymentMethod
        ));
        $withdrawStatistic->setAccount($account->getAccount());
        $em->persist($withdrawStatistic);
        $em->flush();
    }
}