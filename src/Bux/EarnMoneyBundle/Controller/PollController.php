<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/23/15
 * Time: 12:37 PM
 */

namespace Bux\EarnMoneyBundle\Controller;

use Bux\AdvertiseBundle\Form\Type\Poll\PollFormType;
use Bux\EarnMoneyBundle\CommissionEvents;
use Bux\EarnMoneyBundle\Event\PollEvent;
use Bux\StatisticBundle\StatisticEvents;
use Bux\UserBundle\Entity\User;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Class PollController
 *
 * @package Bux\EarnMoneyBundle\Controller
 */
class PollController extends Controller
{
    /**
     * @return array
     *
     * @Route("/poll-ads", name="office_earn_money_poll_ads")
     * @Template("BuxEarnMoneyBundle:Poll:poll_ads.html.twig")
     */
    public function pollAdAction()
    {
        $ads        = null;
        $message    = null;

        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();

        /* @var $user User */
        $user = $this->getUser();

        $categories = $em->getRepository('BuxAdminAdvertisementsBundle:PollCategories')->findAll();

        $day    = new \DateTime();
        $day->modify('-1 day');

        /* @var $qb \Doctrine\ORM\QueryBuilder */
        $qb = $em->getRepository('BuxBlogBundle:Blog')->createQueryBuilder('blog');
        $qb
            ->where('blog.user = :user')
            ->andWhere("blog.date > '" . $day->format('Y-m-d H:i:s') . "'")
            ->setParameter('user', $user);

        $blogs = $qb->getQuery()->getResult();

        if ($blogs) {

            /* @var $qb \Doctrine\ORM\QueryBuilder */
            $qb = $em->getRepository('BuxAdvertiseBundle:PollAd')->createQueryBuilder('pa');
            $qb
                ->leftJoin('pa.statistic', 's')
                ->where("s.date > '" . $day->format('Y-m-d H:i:s') . "'")
                ->andWhere("s.user = '" . $user->getId() . "'");

            $comletedPollAd = $qb->getQuery()->getResult();

            /* @var $qb \Doctrine\ORM\QueryBuilder */
            $qb = $em->getRepository('BuxAdvertiseBundle:PollAd')->createQueryBuilder('pa');

            $qb = $em->createQueryBuilder();

            $qb
                ->select('pa')
                ->from('BuxAdvertiseBundle:PollAd', 'pa')
                ->join('pa.memberships', 'm')
                ->join('pa.countries', 'c')
                ->leftJoin('pa.statistic', 's')
                ->where('m.id = :membership')
                ->andWhere('pa.pause = 0')
                ->andWhere('c.code = :country')
                ->setParameter('membership', $user->getMembership())
                ->setParameter('country', $user->getCountry())
                ->join('pa.value', 'v')
                ->andWhere('pa.credits >= v.credits')
                ->orderBy('s.date', 'ASC');

            if ($comletedPollAd) {
                $qb
                    ->andWhere('pa NOT IN (:ads)')
                    ->setParameter('ads', $comletedPollAd);
            }

            if ($user->getMembership()->getMaxVideoClickInDay() !== 0) {
                $qb
                    ->setMaxResults($user->getMembership()->getMaxPollClickInDay() - count($comletedPollAd));
            } else {
                $qb
                    ->setMaxResults($user->getMembership()->getCountPollAd() - count($comletedPollAd));
            }

            $ads = $qb->getQuery()->getResult();

            if (!$ads) {
                $message = $this->get('translator')->trans('frontend.account.advertiser.no_poll');
            }
        } else {
            $message = $this->get('translator')->trans('frontend.account.advertiser.no_blog');
        }

        return array(
            'ads'       => $ads,
            'message'   => $message
        );
    }

//    /**
//     * @param Request $request
//     * @param int     $id
//     *
//     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
//     *
//     * @Route("/view-poll-ad/{id}", name="office_earn_money_view_poll_ad")
//     * @Template("BuxEarnMoneyBundle:Poll:view_poll_ad.html.twig")
//     */
//    public function viewPollAdAction(Request $request, $id)
//    {
//        /* @var $em EntityManager */
//        $em = $this->getDoctrine()->getManager();
//        $ad = $em->getRepository('BuxAdvertiseBundle:PollAd')->find($id);
//        if (!$ad) {
//            throw new NotFoundHttpException('Not Found!');
//        }
//
//        $ad->setClicks($ad->getClicks() + 1);
//        $em->flush();
//
//        $form = $this->createForm(new PollFormType($ad));
//        if ($request->isMethod('POST')) {
//            $form->handleRequest($request);
//            if ($form->isValid()) {
//                $answer = $form->get('answers')->getData();
//
//                $dispatcher = $this->get('event_dispatcher');
//
//                // Save Statistic
//                $event = new PollEvent($ad, $this->getUser());
//                $dispatcher->dispatch(StatisticEvents::SAVE_POLL_STATISTIC, $event);
//
//                // Set Commission
//                $dispatcher->dispatch(CommissionEvents::SET_POLL_COMMISSION, $event);
//
//                return $this->redirect($this->generateUrl('office_earn_money_poll_ads'));
//            }
//        }
//
//        return array(
//            'ad'    => $ad,
//            'form'  => $form->createView()
//        );
//    }

    /**
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     *
     * @Route("/poll-completed", name="office_earn_money_poll_ad_completed")
     */
    public function pollCompletedAction(Request $request)
    {
        if ($request->isMethod('POST')) {
            /* @var $em EntityManager */
            $em = $this->getDoctrine()->getManager();
            $ad = $em->getRepository('BuxAdvertiseBundle:PollAd')->find($request->get('ad'));

            if (!$ad) {
                throw new NotFoundHttpException('Not Found!');
            }

            /* @var $user User */
            $user = $this->getUser();

            $day    = new \DateTime();
            $day->modify('-1 day');

            /* @var $qb \Doctrine\ORM\QueryBuilder */
            $qb = $em->getRepository('BuxBlogBundle:Blog')->createQueryBuilder('blog');
            $qb
                ->where('blog.user = :user')
                ->andWhere("blog.date > '" . $day->format('Y-m-d H:i:s') . "'")
                ->setParameter('user', $user);

            $blogs = $qb->getQuery()->getResult();

            if (!$blogs) {
                throw new NotFoundHttpException();
            }

            /* @var $qb \Doctrine\ORM\QueryBuilder */
            $qb = $em->getRepository('BuxAdvertiseBundle:PollAd')->createQueryBuilder('va');
            $qb
                ->leftJoin('va.statistic', 's')
                ->where("s.date > '" . $day->format('Y-m-d H:i:s') . "'")
                ->andWhere("s.user = '" . $user->getId() . "'");

            $completedVideoAd = $qb->getQuery()->getResult();

            $qb = $em->getRepository('BuxAdvertiseBundle:PollAd')->createQueryBuilder('va');
            $qb
                ->join('va.memberships', 'm')
                ->join('va.countries', 'c')
                ->leftJoin('va.statistic', 's')
                ->join('va.value', 'v')
                ->where('va.id = :ad')
                ->andWhere('va.pause = 0')
                ->andWhere('va.validate = 1')
                ->andWhere('m.id = :membership')
                ->andWhere('c.code = :country')
                ->andWhere('va.credits >= v.credits')
                ->setParameter('membership', $user->getMembership())
                ->setParameter('country', $user->getCountry())
                ->setParameter('ad', $ad->getId())
                ->orderBy('s.date', 'ASC');

            if ($completedVideoAd) {
                $qb
                    ->andWhere('va NOT IN (:ads)')
                    ->setParameter('ads', $completedVideoAd);
            }

            $ads = $qb->getQuery()->getResult();

            if ($ads) {
                $dispatcher = $this->get('event_dispatcher');

                // Save Statistic
                $event = new PollEvent($ad, $this->getUser());
                $dispatcher->dispatch(StatisticEvents::SAVE_POLL_STATISTIC, $event);

                // Set Commission
                $dispatcher->dispatch(CommissionEvents::SET_POLL_COMMISSION, $event);
            }
        }

        return $this->redirect($this->generateUrl('office_earn_money_poll_ads'));
    }
}