<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/20/15
 * Time: 12:07 PM
 */

namespace Bux\OfficeBundle\Controller;

use Bux\StatisticBundle\Entity\BannerCompleteStatistic;
use Bux\StatisticBundle\Entity\BigBannerCompleteStatistic;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

/**
 * Class BannerController
 *
 * @package Bux\OfficeBundle\Controller
 */
class BannerController extends Controller
{
    /**
     * @param Request $request
     *
     * @return Response
     *
     * @Route("/banner-complete", name="office_banner_complete")
     */
    public function bannerCompleteAction(Request $request)
    {
        $id = $request->get('id');

        $em = $this->getDoctrine()->getManager();
        $ad = $em->getRepository('BuxAdvertiseBundle:BannerAd')->find($id);

        $ad->setClicks($ad->getClicks() + 1);

        $statistic = new BannerCompleteStatistic();
        $statistic->setAd($ad);
        $statistic->setUser($this->getUser());
        $statistic->setDate(new \DateTime());
        $em->persist($statistic);

        $em->flush();

        return new Response('ok');
    }

    /**
     * @param Request $request
     *
     * @return Response
     *
     * @Route("/vip-banner-complete", name="office_vip_banner_complete")
     */
    public function vipBannerCompleteAction(Request $request)
    {
        $id = $request->get('id');

        $em = $this->getDoctrine()->getManager();
        $ad = $em->getRepository('BuxAdvertiseBundle:BigBannerAd')->find($id);

        $ad->setClicks($ad->getClicks() + 1);

        $statistic = new BigBannerCompleteStatistic();
        $statistic->setAd($ad);
        $statistic->setUser($this->getUser());
        $statistic->setDate(new \DateTime());
        $em->persist($statistic);

        $em->flush();

        return new Response('ok');
    }
}