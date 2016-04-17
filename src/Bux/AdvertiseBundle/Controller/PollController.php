<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/22/15
 * Time: 1:37 PM
 */

namespace Bux\AdvertiseBundle\Controller;

use Bux\AdvertiseBundle\Entity\PollAd;
use Bux\AdvertiseBundle\Entity\PollAdAnswer;
use Bux\AdvertiseBundle\Form\Type\Poll\CreditsAllocateFormType;
use Bux\AdvertiseBundle\Form\Type\Poll\PollAdsFormType;
use Bux\AdvertiseBundle\Form\Type\Poll\PollFormType;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Class PollController
 *
 * @package Bux\AdvertiseBundle\Controller
 */
class PollController extends Controller
{
    /**
     * @param Request $request
     *
     * @return array
     *
     * @Route("/add-poll-ads", name="office_account_add_poll_ads")
     * @Template("BuxAdvertiseBundle:Poll:add_poll_ads.html.twig")
     */
    public function addPollAds(Request $request)
    {
        /* @var $em EntityManager */
        $em     = $this->getDoctrine()->getManager();
        $question = new PollAd();
        $question->addAnswer(new PollAdAnswer());
        $question->addAnswer(new PollAdAnswer());
        $question->addAnswer(new PollAdAnswer());
        $question->addAnswer(new PollAdAnswer());
        $form = $this->createForm(new PollAdsFormType(), $question);
        $page = $em->getRepository('BuxAdminSetupBundle:StaticPage')->findOneBy(array(
            'name'  => 'terms'
        ));

        if ($request->isMethod('POST')) {
            $form->handleRequest($request);
            if ($form->isValid()) {
                $data   = $form->getData();
                $data->setUser($this->getUser());
                $data->setValidate(true);
                $em->persist($data);
                $em->flush();

                return $this->redirect($this->generateUrl('office_account_advertiser_panel'));
            }
        }

        return array(
            'form'  => $form->createView(),
            'page'  => $page->getContent()
        );
    }

    /**
     * @param int $id
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     *
     * @Route("/delete-poll-ad/{id}", name="office_account_delete_poll_ad")
     */
    public function deleteVideoAd($id)
    {
        $em = $this->getDoctrine()->getManager();
        $ad = $em->getRepository('BuxAdvertiseBundle:PollAd')->find($id);
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
     * @param int $id
     *
     * @return bool
     *
     * @Route("/pause-poll-ad/{id}", name="office_account_pause_poll_ad")
     */
    public function pauseVideoAd($id)
    {
        $em = $this->getDoctrine()->getManager();
        $ad = $em->getRepository('BuxAdvertiseBundle:PollAd')->find($id);
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
     * @param Request $request
     * @param int     $id
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     *
     * @Route("/poll-ad-validate/{id}", name="office_account_poll_ad_validate")
     * @Template("BuxAdvertiseBundle:Poll:poll_ad_validate.html.twig")
     */
    public function videoAdValidate(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $ad = $em->getRepository('BuxAdvertiseBundle:PollAd')->find($id);
        if (!$ad) {
            throw new NotFoundHttpException('Not Found!');
        }

        $form = $this->createForm(new PollFormType(), $ad);

        if ($request->isMethod('POST')) {
//            $form->handleRequest($request);
//            if ($form->isValid()) {
                $ad->setValidate(true);
                $em->flush();

                return $this->redirect($this->generateUrl('office_account_advertiser_panel'));
//            }
        }

        return array(
            'ad'    => $ad,
            'form'  => $form->createView()
        );
    }

    /**
     * @param Request $request
     * @param int     $id
     *
     * @return array
     *
     * @Route("/poll-ad-allocate/{id}", name="office_account_poll_ad_allocate")
     * @Template("BuxAdvertiseBundle:Poll:poll_ad_allocate.html.twig")
     */
    public function videoAdAllocateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $ad = $em->getRepository('BuxAdvertiseBundle:PollAd')->find($id);
        if (!$ad) {
            throw new NotFoundHttpException('Not Found!');
        }

        $form = $this->createForm(new CreditsAllocateFormType());

        if ($request->isMethod('POST')) {
            $form->handleRequest($request);
            if ($form->isValid()) {
                $credits = $form->get('credits')->getData();
                $user = $this->getUser();
                $userCredits = $user->getPollCredits();
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