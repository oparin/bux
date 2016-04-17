<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/12/15
 * Time: 3:11 PM
 */

namespace Bux\OfficeBundle\Controller;

use Bux\AdvertiseBundle\Entity\AutoSerfCredits;
use Bux\AdvertiseBundle\Entity\BannerCredits;
use Bux\AdvertiseBundle\Entity\BigBannerCredits;
use Bux\AdvertiseBundle\Entity\PollCredits;
use Bux\AdvertiseBundle\Entity\VideoCredits;
use Bux\OfficeBundle\Form\Type\Advertise\AutoSerfCreditsFormType;
use Bux\OfficeBundle\Form\Type\Advertise\BannerCreditsFormType;
use Bux\OfficeBundle\Form\Type\Advertise\PollCreditsFormType;
use Bux\OfficeBundle\Form\Type\Advertise\VideoCreditsFormType;
use Bux\OfficeBundle\Form\Type\Advertise\VipBannerCreditsFormType;
use Bux\UserBundle\Entity\User;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class AdvertiseController
 *
 * @package Bux\OfficeBundle\Controller
 *
 * @Route("/advertise")
 */
class AdvertiseController extends Controller
{
    /**
     * @param Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     *
     * @Route("/", name="office_advertise")
     * @Template("BuxOfficeBundle:Advertise:index.html.twig")
     */
    public function indexAction(Request $request)
    {
        $videoForm = $this->createForm(new VideoCreditsFormType());
        $autoSerfForm = $this->createForm(new AutoSerfCreditsFormType());
        $pollForm = $this->createForm(new PollCreditsFormType());
        $bannerForm = $this->createForm(new BannerCreditsFormType());
        $vipBannerForm = $this->createForm(new VipBannerCreditsFormType());


        if ($request->isMethod('POST')) {
            $parameters = $request->request->all();
            if (isset($parameters['video_credits_form_type'])) {
                $videoForm->handleRequest($request);
                if ($videoForm->isValid()) {
                    $data = $videoForm->get('video')->getData();
                    $session = $this->get('session');
                    $session->set('package_id', $data->getId());

                    return $this->redirect($this->generateUrl('office_advertise_buy_video_credits'));
                }
            }
            if (isset($parameters['poll_credits_form_type'])) {
                $pollForm->handleRequest($request);
                if ($pollForm->isValid()) {
                    $data = $pollForm->get('poll')->getData();
                    $session = $this->get('session');
                    $session->set('package_id', $data->getId());

                    return $this->redirect($this->generateUrl('office_advertise_buy_poll_credits'));
                }
            }

            if (isset($parameters['auto_serf_credits_form_type'])) {
                $autoSerfForm->handleRequest($request);
                if ($autoSerfForm->isValid()) {
                    $data = $autoSerfForm->get('packages')->getData();
                    $session = $this->get('session');
                    $session->set('package_id', $data->getId());

                    return $this->redirect($this->generateUrl('office_advertise_buy_auto_serf_credits'));
                }
            }

            if (isset($parameters['banner_credits_form_type'])) {
                $bannerForm->handleRequest($request);
                if ($bannerForm->isValid()) {
                    $data = $bannerForm->get('packages')->getData();
                    $session = $this->get('session');
                    $session->set('package_id', $data->getId());

                    return $this->redirect($this->generateUrl('office_advertise_buy_banner_credits'));
                }
            }

            if (isset($parameters['vip_banner_credits_form_type'])) {
                $vipBannerForm->handleRequest($request);
                if ($vipBannerForm->isValid()) {
                    $data = $vipBannerForm->get('packages')->getData();
                    $session = $this->get('session');
                    $session->set('package_id', $data->getId());

                    return $this->redirect($this->generateUrl('office_advertise_buy_vip_banner_credits'));
                }
            }
        }

        return array(
            'video_form' => $videoForm->createView(),
            'poll_form' => $pollForm->createView(),
            'auto_serf_form' => $autoSerfForm->createView(),
            'banner_form' => $bannerForm->createView(),
            'vip_banner_form' => $vipBannerForm->createView()
        );
    }

    /**
     * @param Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     *
     * @Route("/buy-video-credits", name="office_advertise_buy_video_credits")
     * @Template("BuxOfficeBundle:Advertise:buy_video_credits.html.twig")
     */
    public function buyVideoCredits(Request $request)
    {
        $session = $this->get('session');
        $packageId = $session->get('package_id');

        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();
        $package = $em->getRepository('BuxAdminAdvertisementsBundle:VideoPackages')->find($packageId);

        if ($request->isMethod('POST')) {
            $user = $this->getUser();
            $purchaseWallet = $user->getPurchaseWallet();
            if ($purchaseWallet->getSum() < $package->getPrice()) {
                $this->get('session')->getFlashBag()->add(
                    'error',
                    $this->get('translator')->trans('frontend.advertise.form.you_not_funds.')
                );
            } else {
                $purchaseWallet->setSum($purchaseWallet->getSum() - $package->getPrice());
                $credits = $em->getRepository('BuxAdvertiseBundle:VideoCredits')->findOneBy(array(
                    'user' => $user,
                ));
                if (!$credits) {
                    $credits = new VideoCredits();
                    $credits->setUser($user);
                }
                $credits->setCredits($credits->getCredits() + $package->getCredits());
                $em->persist($credits);

                $this->purchaseCommission($user, $package->getPrice());

                $em->flush();

                return $this->redirect($this->generateUrl('office_advertise_buy_video_credits_success'));
            }
        }

        return array(
            'package' => $package
        );
    }

    /**
     * @param Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     *
     * @Route("/buy-poll-credits", name="office_advertise_buy_poll_credits")
     * @Template("BuxOfficeBundle:Advertise:buy_poll_credits.html.twig")
     */
    public function buyPollCredits(Request $request)
    {
        $session = $this->get('session');
        $packageId = $session->get('package_id');

        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();
        $package = $em->getRepository('BuxAdminAdvertisementsBundle:PollPackages')->find($packageId);

        if ($request->isMethod('POST')) {
            $user = $this->getUser();
            $purchaseWallet = $user->getPurchaseWallet();
            if ($purchaseWallet->getSum() < $package->getPrice()) {
                $this->get('session')->getFlashBag()->add(
                    'error',
                    $this->get('translator')->trans('frontend.advertise.form.you_not_funds.')
                );
            } else {
                $purchaseWallet->setSum($purchaseWallet->getSum() - $package->getPrice());
                $credits = $em->getRepository('BuxAdvertiseBundle:PollCredits')->findOneBy(array(
                    'user' => $user,
                ));
                if (!$credits) {
                    $credits = new PollCredits();
                    $credits->setUser($user);
                }
                $credits->setCredits($credits->getCredits() + $package->getCredits());
                $em->persist($credits);

                $this->purchaseCommission($user, $package->getPrice());

                $em->flush();

                return $this->redirect($this->generateUrl('office_advertise_buy_video_credits_success'));
            }
        }

        return array(
            'package' => $package
        );
    }

    /**
     * @param Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     *
     * @Route("/buy-auto-serf-credits", name="office_advertise_buy_auto_serf_credits")
     * @Template("BuxOfficeBundle:Advertise:buy_auto_serf_credits.html.twig")
     */
    public function buyAutoSerfCredits(Request $request)
    {
        $session = $this->get('session');
        $packageId = $session->get('package_id');

        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();
        $package = $em->getRepository('BuxAdminAdvertisementsBundle:AutoSerfPackages')->find($packageId);

        if ($request->isMethod('POST')) {
            $user = $this->getUser();
            $purchaseWallet = $user->getPurchaseWallet();
            if ($purchaseWallet->getSum() < $package->getPrice()) {
                $this->get('session')->getFlashBag()->add(
                    'error',
                    $this->get('translator')->trans('frontend.advertise.form.you_not_funds.')
                );
            } else {
                $purchaseWallet->setSum($purchaseWallet->getSum() - $package->getPrice());
                $credits = $em->getRepository('BuxAdvertiseBundle:AutoSerfCredits')->findOneBy(array(
                    'user' => $user,
                ));
                if (!$credits) {
                    $credits = new AutoSerfCredits();
                    $credits->setUser($user);
                }
                $credits->setCredits($credits->getCredits() + $package->getCredits());
                $em->persist($credits);

                $this->purchaseCommission($user, $package->getPrice());

                $em->flush();

                return $this->redirect($this->generateUrl('office_advertise_buy_video_credits_success'));
            }
        }

        return array(
            'package' => $package
        );
    }

    /**
     * @return array
     *
     * @Route("/buy-video-credits-success", name="office_advertise_buy_video_credits_success")
     * @Template("BuxOfficeBundle:Advertise:buy_video_credits_success.html.twig")
     */
    public function buyVideoCreditsSuccess()
    {
        return array();
    }

    /**
     * @param Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     *
     * @Route("/buy-banner-credits", name="office_advertise_buy_banner_credits")
     * @Template("BuxOfficeBundle:Advertise:buy_banner_credits.html.twig")
     */
    public function buyBannerCredits(Request $request)
    {
        $session = $this->get('session');
        $packageId = $session->get('package_id');

        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();
        $package = $em->getRepository('BuxAdminAdvertisementsBundle:BannerPackages')->find($packageId);

        if ($request->isMethod('POST')) {
            $user = $this->getUser();
            $purchaseWallet = $user->getPurchaseWallet();
            if ($purchaseWallet->getSum() < $package->getPrice()) {
                $this->get('session')->getFlashBag()->add(
                    'error',
                    $this->get('translator')->trans('frontend.advertise.form.you_not_funds.')
                );
            } else {
                $purchaseWallet->setSum($purchaseWallet->getSum() - $package->getPrice());
                $credits = $em->getRepository('BuxAdvertiseBundle:BannerCredits')->findOneBy(array(
                    'user' => $user,
                ));
                if (!$credits) {
                    $credits = new BannerCredits();
                    $credits->setUser($user);
                }
                $credits->setCredits($credits->getCredits() + $package->getCredits());
                $em->persist($credits);

                $this->purchaseCommission($user, $package->getPrice());

                $em->flush();

                return $this->redirect($this->generateUrl('office_advertise_buy_video_credits_success'));
            }
        }

        return array(
            'package' => $package
        );
    }

    /**
     * @param Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     *
     * @Route("/buy-vip-banner-credits", name="office_advertise_buy_vip_banner_credits")
     * @Template("BuxOfficeBundle:Advertise:buy_vip_banner_credits.html.twig")
     */
    public function buyVipBannerCredits(Request $request)
    {
        $session = $this->get('session');
        $packageId = $session->get('package_id');

        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();
        $package = $em->getRepository('BuxAdminAdvertisementsBundle:BigBannerPackages')->find($packageId);

        if ($request->isMethod('POST')) {
            $user = $this->getUser();
            $purchaseWallet = $user->getPurchaseWallet();
            if ($purchaseWallet->getSum() < $package->getPrice()) {
                $this->get('session')->getFlashBag()->add(
                    'error',
                    $this->get('translator')->trans('frontend.advertise.form.you_not_funds.')
                );
            } else {
                $purchaseWallet->setSum($purchaseWallet->getSum() - $package->getPrice());
                $credits = $em->getRepository('BuxAdvertiseBundle:BigBannerCredits')->findOneBy(array(
                    'user' => $user,
                ));
                if (!$credits) {
                    $credits = new BigBannerCredits();
                    $credits->setUser($user);
                }
                $credits->setCredits($credits->getCredits() + $package->getCredits());
                $em->persist($credits);

                $this->purchaseCommission($user, $package->getPrice());

                $em->flush();

                return $this->redirect($this->generateUrl('office_advertise_buy_video_credits_success'));
            }
        }

        return array(
            'package' => $package
        );
    }

    /**
     * @param User    $user
     * @param float   $price
     */
    public function purchaseCommission(User $user, $price)
    {
        if ($sponsor = $user->getSponsor()) {
            $sponsorWallet = $sponsor->getWallet();
            $sponsorWallet->setSum($sponsorWallet->getSum() + $price * $sponsor->getMembership()->getPurchaseComission() / 100);
        }
    }
}