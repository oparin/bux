<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/18/15
 * Time: 1:36 PM
 */

namespace Bux\AccountBundle\Controller;

use Bux\AccountBundle\Form\Type\ConvertMinutesFormType;
use Bux\UserBundle\Entity\User;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

/**
 * Class ConvertController
 *
 * @package Bux\AccountBundle\Controller
 */
class ConvertController extends Controller
{
    /**
     * @param Request $request
     *
     * @return array
     *
     * @Route("/convert-minuts", name="office_account_convert_minuts")
     * @Template("BuxAccountBundle:Convert:convert_minuts.html.twig")
     */
    public function videoAdAllocateAction(Request $request)
    {
        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();

        $settings = $em->getRepository('BuxAdminAdvertisementsBundle:AutoSerfGeneralSettings')->find(1);
        $priceMinute = $settings->getPriceMinute();

        $form = $this->createForm(new ConvertMinutesFormType());

        if ($request->isMethod('POST')) {
            $form->handleRequest($request);
            if ($form->isValid()) {
                $minutes = $form->get('minutes')->getData();

                /* @var $user User */
                $user = $this->getUser();
                $seconds = $user->getAutoSerfSeconds();

                if ($minutes * 60 > $seconds) {
                    $this->get('session')->getFlashBag()->add(
                        'error',
                        $this->get('translator')->trans('frontend.account.form.you_not_have_enough_minutes')
                    );
                } else {
                    $sum = $minutes * $priceMinute;
                    $walet = $user->getWallet();
                    $walet->setSum($walet->getSum() + $sum);
                    $user->setAutoSerfSeconds($user->getAutoSerfSeconds() - $minutes * 60);
                    $em->flush();

//                    $this->get('session')->getFlashBag()->add(
//                        'success',
//                        $this->get('translator')->trans('frontend.account.advertiser.form.credits_allocate_success')
//                    );

                    return $this->redirect($this->generateUrl('office_account'));
                }
            }
        }

        return array(
            'form'          => $form->createView(),
            'price_minute'  => $priceMinute
        );
    }
}