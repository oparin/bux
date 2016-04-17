<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/23/15
 * Time: 5:12 PM
 */

namespace Bux\AdvertiseBundle\Controller;

use Bux\AdvertiseBundle\Entity\AutoSerfAd;
use Bux\AdvertiseBundle\Form\Type\AutoSerf\AutoSerfAdFormType;
use Bux\AdvertiseBundle\Form\Type\AutoSerf\CreditsAllocateFormType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Class AutoSerfController
 *
 * @package Bux\AdvertiseBundle\Controller
 */
class AutoSerfController extends Controller
{
    /**
     * @param Request $request
     *
     * @return array
     *
     * @Route("/add-auto-serf-ad", name="office_account_add_auto_serf_ad")
     * @Template("BuxAdvertiseBundle:AutoSerf:add_auto_serf_ad.html.twig")
     */
    public function addVideoAds(Request $request)
    {
        $form = $this->createForm(new AutoSerfAdFormType());

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
     * @Route("/pause-autosurf-ad/{id}", name="office_account_pause_autosurf_ad")
     */
    public function pauseAutoSerfAdAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $ad = $em->getRepository('BuxAdvertiseBundle:AutoSerfAd')->find($id);
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
     * @Route("/delete-autosurf-ad/{id}", name="office_account_delete_autosurf_ad")
     */
    public function deleteAutoSurfAdAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $ad = $em->getRepository('BuxAdvertiseBundle:AutoSerfAd')->find($id);
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
     * @Route("/autosurf-ad-allocate/{id}", name="office_account_autosurf_ad_allocate")
     * @Template("BuxAdvertiseBundle:AutoSerf:allocate.html.twig")
     */
    public function autoSurfAdAllocateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $ad = $em->getRepository('BuxAdvertiseBundle:AutoSerfAd')->find($id);
        if (!$ad) {
            throw new NotFoundHttpException('Not Found!');
        }

        $form = $this->createForm(new CreditsAllocateFormType());

        if ($request->isMethod('POST')) {
            $form->handleRequest($request);
            if ($form->isValid()) {
                $credits = $form->get('credits')->getData();
                $user = $this->getUser();
                $userCredits = $user->getAutoSerfCredits();
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