<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/23/15
 * Time: 12:50 PM
 */

namespace Bux\OfficeBundle\Controller;

use Bux\OfficeBundle\Form\Type\FundsTransferFormType;
use Bux\UserBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class FundsTransferController
 *
 * @package Bux\OfficeBundle\Controller
 *
 * @Route("/funds-transfer")
 */
class FundsTransferController extends Controller
{
    /**
     * @param Request $request
     *
     * @return array
     *
     * @Route("/", name="office_funds_transfer")
     * @Template("BuxOfficeBundle:FundsTransfer:index.html.twig")
     */
    public function indexAction(Request $request)
    {
        $form = $this->createForm(new FundsTransferFormType());

        if ($request->isMethod('POST')) {
            $form->handleRequest($request);
            if ($form->isValid()) {
                $sum = $form->get('sum')->getData();

                /* @var $user User */
                $user   = $this->getUser();
                $wallet = $user->getWallet();

                if ($wallet->getSum() < $sum) {
                    $this->get('session')->getFlashBag()->add(
                        'error',
                        $this->get('translator')->trans('frontend.funds_transfer.form.you_not_funds')
                    );
                } else {
                    $wallet->setSum($wallet->getSum() - $sum);
                    $purchaseWallet = $user->getPurchaseWallet();
                    $purchaseWallet->setSum($purchaseWallet->getSum() + $sum);

                    $em = $this->getDoctrine()->getManager();
                    $em->flush();

                    $this->get('session')->getFlashBag()->add(
                        'success',
                        $this->get('translator')->trans('frontend.funds_transfer.form.transfer_success')
                    );

                    return $this->redirect($this->generateUrl('office_funds_transfer'));
                }
            }
        }

        return array(
            'form'  => $form->createView(),
        );
    }
}