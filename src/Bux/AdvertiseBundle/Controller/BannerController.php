<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/20/15
 * Time: 1:07 PM
 */

namespace Bux\AdvertiseBundle\Controller;

use Bux\AdvertiseBundle\Form\Type\Banner\BannerAdFormType;
use Bux\AdvertiseBundle\Form\Type\Banner\CreditsAllocateFormType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Class BannerController
 *
 * @package Bux\AdvertiseBundle\Controller
 */
class BannerController extends Controller
{
    /**
     * @param Request $request
     *
     * @return array
     *
     * @Route("/add-banner-ad", name="office_account_add_banner_ad")
     * @Template("BuxAdvertiseBundle:Banner:add_auto_serf_ad.html.twig")
     */
    public function addVideoAds(Request $request)
    {
        $form = $this->createForm(new BannerAdFormType());

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
     * @Route("/pause-banner-ad/{id}", name="office_account_pause_banner_ad")
     */
    public function pauseBannerAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $ad = $em->getRepository('BuxAdvertiseBundle:BannerAd')->find($id);
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
     * @Route("/delete-banner-ad/{id}", name="office_account_delete_banner_ad")
     */
    public function deleteBannerAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $ad = $em->getRepository('BuxAdvertiseBundle:BannerAd')->find($id);
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
     * @Route("/banner-ad-allocate/{id}", name="office_account_banner_ad_allocate")
     * @Template("BuxAdvertiseBundle:Banner:allocate.html.twig")
     */
    public function autoSurfAdAllocateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $ad = $em->getRepository('BuxAdvertiseBundle:BannerAd')->find($id);
        if (!$ad) {
            throw new NotFoundHttpException('Not Found!');
        }

        $form = $this->createForm(new CreditsAllocateFormType());

        if ($request->isMethod('POST')) {
            $form->handleRequest($request);
            if ($form->isValid()) {
                $credits = $form->get('credits')->getData();
                $user = $this->getUser();
                $userCredits = $user->getBannerCredits();
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