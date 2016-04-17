<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/20/15
 * Time: 1:36 PM
 */

namespace Bux\EarnMoneyBundle\Controller;

use Bux\EarnMoneyBundle\CommissionEvents;
use Bux\EarnMoneyBundle\Event\VideoEvent;
use Bux\StatisticBundle\StatisticEvents;
use Bux\UserBundle\Entity\User;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Class VideoController
 *
 * @package Bux\EarnMoneyBundle\Controller
 */
class VideoController extends Controller
{
    /**
     * @return array
     *
     * @Route("/video-ads", name="office_earn_money_video_ads")
     * @Template("BuxEarnMoneyBundle:Video:video_ads.html.twig")
     */
    public function videoAdAction()
    {
        $ads     = null;
        $message = null;

        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();

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

        if ($blogs) {
            /* @var $qb \Doctrine\ORM\QueryBuilder */
            $qb = $em->getRepository('BuxAdvertiseBundle:VideoAd')->createQueryBuilder('va');
            $qb
                ->leftJoin('va.statistic', 's')
                ->where("s.date > '" . $day->format('Y-m-d H:i:s') . "'")
                ->andWhere("s.user = '" . $user->getId() . "'");

            $completedVideoAd = $qb->getQuery()->getResult();

            $qb = $em->getRepository('BuxAdvertiseBundle:VideoAd')->createQueryBuilder('va');
            $qb
                ->join('va.memberships', 'm')
                ->join('va.countries', 'c')
                ->leftJoin('va.statistic', 's')
                ->join('va.value', 'v')
                ->where('va.pause = 0')
                ->andWhere('va.validate = 1')
                ->andWhere('m.id = :membership')
                ->andWhere('c.code = :country')
                ->andWhere('va.credits >= v.credits')
                ->setParameter('membership', $user->getMembership())
                ->setParameter('country', $user->getCountry())
                ->orderBy('s.date', 'ASC');

            if ($completedVideoAd) {
                $qb
                    ->andWhere('va NOT IN (:ads)')
                    ->setParameter('ads', $completedVideoAd);
            }

            if ($user->getMembership()->getMaxVideoClickInDay() !== 0) {
                $qb
                    ->setMaxResults($user->getMembership()->getMaxVideoClickInDay() - count($completedVideoAd));
            }

            $ads = $qb->getQuery()->getResult();

            if (!$ads) {
                $message = $this->get('translator')->trans('frontend.account.advertiser.no_video');
            }
        } else {
            $message = $this->get('translator')->trans('frontend.account.advertiser.no_blog');
        }

        return array(
            'ads'       => $ads,
            'message'   => $message
        );
    }

    /**
     * @param int $id
     *
     * @return array
     *
     * @Route("/view-video-ad/{id}", name="office_earn_money_view_video_ad")
     * @Template("BuxEarnMoneyBundle:Video:view_video_ad.html.twig")
     */
    public function viewVideoAdAction($id)
    {
        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();

        $ad = $em->getRepository('BuxAdvertiseBundle:VideoAd')->find($id);
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
        $qb = $em->getRepository('BuxAdvertiseBundle:VideoAd')->createQueryBuilder('va');
        $qb
            ->leftJoin('va.statistic', 's')
            ->where("s.date > '" . $day->format('Y-m-d H:i:s') . "'")
            ->andWhere("s.user = '" . $user->getId() . "'");

        $completedVideoAd = $qb->getQuery()->getResult();

        $qb = $em->getRepository('BuxAdvertiseBundle:VideoAd')->createQueryBuilder('va');
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

        if (!$ads) {
            throw new NotFoundHttpException();
        }

        $ad->setClicks($ad->getClicks() + 1);
        $em->flush();

        return array(
            'ad'    => $ad
        );
    }

    /**
     * @param Request $request
     *
     * @return Response
     *
     * @Route("/view-video-ad-success", name="office_earn_money_view_video_ad_success")
     */
    public function viewVideoAdSuccessAction(Request $request)
    {
        if ($request->isMethod('POST')) {
            /* @var $em EntityManager */
            $em = $this->getDoctrine()->getManager();

            $ad = $em->getRepository('BuxAdvertiseBundle:VideoAd')->find($request->get('id'));
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
            $qb = $em->getRepository('BuxAdvertiseBundle:VideoAd')->createQueryBuilder('va');
            $qb
                ->leftJoin('va.statistic', 's')
                ->where("s.date > '" . $day->format('Y-m-d H:i:s') . "'")
                ->andWhere("s.user = '" . $user->getId() . "'");

            $completedVideoAd = $qb->getQuery()->getResult();

            $qb = $em->getRepository('BuxAdvertiseBundle:VideoAd')->createQueryBuilder('va');
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
                $event = new VideoEvent($ad, $this->getUser());
                $dispatcher->dispatch(StatisticEvents::SAVE_VIDEO_STATISTIC, $event);

                // Set Commission
                $dispatcher->dispatch(CommissionEvents::SET_VIDEO_COMMISSION, $event);
            }

            return new Response('ok');
        }
    }
}