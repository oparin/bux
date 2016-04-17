<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/23/15
 * Time: 5:51 PM
 */

namespace Bux\EarnMoneyBundle\Controller;

use Bux\EarnMoneyBundle\CommissionEvents;
use Bux\EarnMoneyBundle\Event\AutoSerfEvent;
use Bux\StatisticBundle\StatisticEvents;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Class AutoSerfController
 *
 * @package Bux\EarnMoneyBundle\Controller
 */
class AutoSerfController extends Controller
{
    /**
     * @return array
     *
     * @Route("/auto-serf-ads", name="office_earn_money_auto_serf_ads")
     * @Template("BuxEarnMoneyBundle:AutoSerf:auto_serf_ads.html.twig")
     */
    public function autoSerfAdAction()
    {
        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();

        return array(
//            'ads'   => $ads
        );
    }

    /**
     * @return Response
     *
     * @Route("/get-auto-serf-ads", name="office_earn_money_get_auto_serf_ads")
     */
    public function getAutoSerfAds()
    {
        $ads        = null;
        $message    = null;

        $user = $this->getUser();

        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();

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
            $qb = $em->getRepository('BuxAdvertiseBundle:AutoSerfAd')->createQueryBuilder('asa');
            $qb
                ->leftJoin('asa.statistic', 's')
                ->where("s.date > '" . $day->format('Y-m-d H:i:s') . "'")
                ->andWhere("s.user = '" . $user->getId() . "'");

            $comletedAd = $qb->getQuery()->getResult();

            /* @var $em EntityManager */
            $em = $this->getDoctrine()->getManager();
            $qb = $em->getRepository('BuxAdvertiseBundle:AutoSerfAd')->createQueryBuilder('asa');
            $qb
                ->select('asa', 'cat')
                ->leftJoin('asa.category', 'cat')
                ->join('asa.memberships', 'm')
                ->join('asa.countries', 'c')
                ->join('asa.category', 'v')
                ->where('asa.pause = 0')
                ->andWhere('asa.validate = 1')
                ->andWhere('m.id = :membership')
                ->andWhere('c.code = :country')
                ->andWhere('asa.credits >= v.credits')
                ->setParameter('membership', $user->getMembership())
                ->setParameter('country', $user->getCountry());

            if ($comletedAd) {
                $qb
                    ->andWhere('asa NOT IN (:ads)')
                    ->setParameter('ads', $comletedAd);
            }

            $ads = $qb->getQuery()->getArrayResult();

            if ($ads) {
                $result = array('code' => '200', 'result' => $ads);
            } else {
                $result = array('code' => '404', 'result' => $this->get('translator')->trans('frontend.account.advertiser.no_poll'));
            }
        } else {
            $result = array('code' => '404', 'result' => $this->get('translator')->trans('frontend.account.advertiser.no_blog'));
        }

        return new Response(json_encode($result));
    }

    /**
     * @param Request $request
     *
     * @return Response
     *
     * @Route("/auto-serf-complete", name="office_earn_money_auto_serf_ads_complete")
     */
    public function autoSerfCompleteAction(Request $request)
    {
        $id = $request->get('id');

        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();
        $ad = $em->getRepository('BuxAdvertiseBundle:AutoSerfAd')->find($id);

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
        $qb = $em->getRepository('BuxAdvertiseBundle:AutoSerfAd')->createQueryBuilder('va');
        $qb
            ->leftJoin('va.statistic', 's')
            ->where("s.date > '" . $day->format('Y-m-d H:i:s') . "'")
            ->andWhere("s.user = '" . $user->getId() . "'");

        $completedVideoAd = $qb->getQuery()->getResult();

        $qb = $em->getRepository('BuxAdvertiseBundle:AutoSerfAd')->createQueryBuilder('va');
        $qb
            ->join('va.memberships', 'm')
            ->join('va.countries', 'c')
            ->leftJoin('va.statistic', 's')
            ->join('va.category', 'v')
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
            $event = new AutoSerfEvent($ad, $this->getUser());
            $dispatcher->dispatch(StatisticEvents::SAVE_AUTO_SERF_STATISTIC, $event);

            // Set Commission
            $dispatcher->dispatch(CommissionEvents::SET_AUTO_SERF_COMMISSION, $event);

            return new Response($ad->getTitle());
        }
    }

    /**
     * @return array
     *
     * @Route("/view-auto-serf-ads", name="office_earn_money_view_auto_serf_ads")
     * @Template("BuxEarnMoneyBundle:AutoSerf:view_auto_serf_ads.html.twig")
     */
    public function viewAutoSerfAction()
    {
        return array();
    }
}