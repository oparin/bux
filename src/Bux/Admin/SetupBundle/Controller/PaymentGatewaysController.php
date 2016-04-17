<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/6/15
 * Time: 11:13 AM
 */

namespace Bux\Admin\SetupBundle\Controller;

use Bux\Admin\SetupBundle\Form\Type\PaymentGateways\PaymentGatewaysFormType;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

/**
 * Class PaymentGatewaysController
 *
 * @package Bux\Admin\SetupBundle\Controller
 */
class PaymentGatewaysController extends Controller
{
    /**
     * @param Request $request
     *
     * @return array
     *
     * @Route("/payment-gateways", name="admin_setup_payment_gateways")
     * @Template("BuxAdminSetupBundle:PaymentGateways:payment_gateways.html.twig")
     */
    public function paymentGatewaysAction(Request $request)
    {
        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();
        $methods    = $em->getRepository('BuxWalletBundle:PaymentMethod')->findAll();

        $form = $this->createForm(new PaymentGatewaysFormType());

        $perfectMoneySettings = $em->getRepository('BuxAdminSetupBundle:PaymentGateways\PerfectMoneySettings')->find(1);
        $form->get('perfectMoney')->setData($perfectMoneySettings);

        $payeerSettings = $em->getRepository('BuxAdminSetupBundle:PaymentGateways\PayeerSettings')->find(1);
        $form->get('payeer')->setData($payeerSettings);

        if ($request->isMethod('POST')) {
            $form->handleRequest($request);
            if ($form->isValid()) {
                $em->flush();

                $this->get('session')->getFlashBag()->add(
                    'success',
                    'Success!'
                );

                return $this->redirect($this->generateUrl('admin_setup_payment_gateways'));
            }
        }

        return array(
            'methods'   => $methods,
            'form'      => $form->createView()
        );
    }
}