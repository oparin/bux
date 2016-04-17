<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/8/15
 * Time: 11:38 AM
 */

namespace Bux\AccountBundle\Controller;

use Bux\UserBundle\Entity\User;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class LogsController
 *
 * @package Bux\AccountBundle\Controller
 */
class LogsController extends Controller
{
    /**
     * @param Request $request
     *
     * @return array
     *
     * @Route("/withdraw-history", name="office_account_logs_withdraw_history")
     * @Template("BuxAccountBundle:Logs:withdraw_history.html.twig")
     */
    public function withdrawHistoryAction(Request $request)
    {
        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();
        $qb = $em->getRepository('BuxStatisticBundle:WithdrawStatistic')->createQueryBuilder('s');
        $qb
            ->where('s.user = :user')
            ->orderBy('s.id', 'DESC')
            ->setParameter('user', $this->getUser());
        $query = $qb->getQuery();

        $paginator  = $this->get('knp_paginator');

        /* @var $pagination \Knp\Bundle\PaginatorBundle\Pagination\SlidingPagination */
        $pagination = $paginator->paginate(
            $query,
            $request->query->get('page', 1)/*page number*/,
            10/*limit per page*/
        );
        $pagination->setTemplate('BuxBlogBundle:Blog:office_pagination.html.twig');

        return array(
            'statistics' => $pagination
        );
    }

    /**
     * @param Request $request
     *
     * @return array
     *
     * @Route("/deposit-history", name="office_account_logs_deposit_history")
     * @Template("BuxAccountBundle:Logs:deposit_history.html.twig")
     */
    public function depositHistoryAction(Request $request)
    {
        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();
        $qb = $em->getRepository('BuxStatisticBundle:DepositStatistic')->createQueryBuilder('s');
        $qb
            ->where('s.user = :user')
            ->orderBy('s.id', 'DESC')
            ->setParameter('user', $this->getUser());
        $query = $qb->getQuery();

        $paginator  = $this->get('knp_paginator');

        /* @var $pagination \Knp\Bundle\PaginatorBundle\Pagination\SlidingPagination */
        $pagination = $paginator->paginate(
            $query,
            $request->query->get('page', 1)/*page number*/,
            10/*limit per page*/
        );
        $pagination->setTemplate('BuxBlogBundle:Blog:office_pagination.html.twig');

        return array(
            'statistics' => $pagination
        );
    }

    /**
     * @return array
     *
     * @Route("/referral-bonus", name="office_account_logs_referral_bonus")
     * @Template("BuxAccountBundle:Logs:referral_bonus.html.twig")
     */
    public function referralBonusAction()
    {
        /* @var $user User */
        $user = $this->getUser();

        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();

        $qb = $em->getRepository('BuxStatisticBundle:AdBonusStatistic')->createQueryBuilder('bs');
        $qb
            ->select('bs.level', 'SUM(bs.sum) AS bonus')
            ->where('bs.userTo = :user')
            ->groupBy('bs.level')
            ->orderBy('bs.level', 'ASC')
            ->setParameter('user', $user);

        $statistic = $qb->getQuery()->getResult();

        return array(
            'statistics'    => $statistic
        );
    }
}