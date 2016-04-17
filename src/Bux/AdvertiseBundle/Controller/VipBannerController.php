<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 3/4/15
 * Time: 6:28 PM
 */

namespace Bux\AdvertiseBundle\Controller;

use Bux\AdvertiseBundle\Form\Type\VipBanner\AdFormType;
use Bux\AdvertiseBundle\Form\Type\VipBanner\CreditsAllocateFormType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Class VipBannerController
 *
 * @package Bux\AdvertiseBundle\Controller
 */
class VipBannerController extends Controller
{
    /**
     * @param Request $request
     *
     * @return array
     *
     * @Route("/add-vip-banner-ad", name="office_account_add_vip_banner_ad")
     * @Template("BuxAdvertiseBundle:VipBanner:add.html.twig")
     */
    public function addVideoAds(Request $request)
    {
        $form = $this->createForm(new AdFormType());

        if ($request->isMethod('POST')) {
            $form->handleRequest($request);
            if ($form->isValid()) {
                $data   = $form->getData();
                $data->setUser($this->getUser());
                $data->setValidate(true);
                $em     = $this->getDoctrine()->getManager();
                $em->persist($data);
                $em->flush();

                return $this->redirect($this->generateUrl('office_account_advertiser_panel'));
            }
        }

        return array(
            'form'  => $form->createView()
        );
    }

    /**
     * @param int $id
     *
     * @return Response
     *
     * @Route("/pause-vip-banner-ad/{id}", name="office_account_pause_vip_banner_ad")
     */
    public function pauseBannerAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $ad = $em->getRepository('BuxAdvertiseBundle:BigBannerAd')->find($id);
        if (!$ad) {
            throw new NotFoundHttpException('Not Found!');
        }

        if ($ad->getPause()) {
            $ad->setPause(false);
            $em->flush();

            return new Response('start');
        } else {
            $ad->setPause(true);
            $em->flush();

            return new Response('pause');
        }
    }

    /**
     * @param int $id
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     *
     * @Route("/delete-vip-banner-ad/{id}", name="office_account_delete_vip_banner_ad")
     */
    public function deleteBannerAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $ad = $em->getRepository('BuxAdvertiseBundle:BigBannerAd')->find($id);
        if (!$ad) {
            throw new NotFoundHttpException('Not Found!');
        }

        $user = $this->getUser();
        $userCredits = $user->getVideoCredits();
        $userCredits->setCredits($userCredits->getCredits() + $ad->getCredits());
        $em->remove($ad);
        $em->flush();

        return $this->redirect($this->generateUrl('office_account_advertiser_panel'));
    }

    /**
     * @param Request $request
     * @param int     $id
     *
     * @return array
     *
     * @Route("/vip-banner-ad-allocate/{id}", name="office_account_vip_banner_ad_allocate")
     * @Template("BuxAdvertiseBundle:VipBanner:allocate.html.twig")
     */
    public function autoSurfAdAllocateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $ad = $em->getRepository('BuxAdvertiseBundle:BigBannerAd')->find($id);
        if (!$ad) {
            throw new NotFoundHttpException('Not Found!');
        }

        $form = $this->createForm(new CreditsAllocateFormType());

        if ($request->isMethod('POST')) {
            $form->handleRequest($request);
            if ($form->isValid()) {
                $credits = $form->get('credits')->getData();
                $user = $this->getUser();
                $userCredits = $user->getBigBannerCredits();
                if ($userCredits->getCredits() < $credits) {
                    $this->get('session')->getFlashBag()->add(
                        'error',
                        $this->get('translator')->trans('frontend.account.advertiser.form.credits_allocate_error')
                    );
                } else {
                    $userCredits->setCredits($userCredits->getCredits() - $credits);
                    $ad->setCredits($credits);
                    $em->flush();
                    $this->get('session')->getFlashBag()->add(
                        'success',
                        $this->get('translator')->trans('frontend.account.advertiser.form.credits_allocate_success')
                    );

                    return $this->redirect($this->generateUrl('office_account_advertiser_panel'));
                }
            }
        }

        return array(
            'form'  => $form->createView(),
            'ad'    => $ad
        );
    }
}