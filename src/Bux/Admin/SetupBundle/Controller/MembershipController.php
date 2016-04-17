<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/26/15
 * Time: 12:25 PM
 */

namespace Bux\Admin\SetupBundle\Controller;

use APY\DataGridBundle\Grid\Action\DeleteMassAction;
use APY\DataGridBundle\Grid\Action\RowAction;
use APY\DataGridBundle\Grid\Source\Entity;
use Bux\Admin\SetupBundle\Form\Type\NewMembershipFormType;
use Bux\UserBundle\Entity\Membership;
use Bux\UserBundle\Entity\ReferralPrice;
use Bux\UserBundle\Entity\WithdrawSettings;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;


/**
 * Class MembershipController
 *
 * @package Bux\Admin\SetupBundle\Controller
 */
class MembershipController extends Controller
{
    /**
     * @param Request  $request
     * @param int|null $id
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     *
     * @Route("/membership-settings/{id}", name="admin_setup_membership_settings")
     * @Template("BuxAdminSetupBundle:Membership:membership_settings.html.twig")
     */
    public function membershipSettingsAction(Request $request, $id = null)
    {
        if ($id) {
            $tab = 'new';
        } else {
            $tab = 'manage';
        }
        $source     = new Entity('BuxUserBundle:Membership');
        $grid       = $this->get('grid');
        $grid->setSource($source);

        $grid->hideColumns(array(
            'id',
            'purchaseComission',
            'upgradeComission',
            'refDeletionCost',
            'rentedRefLimit',
            'countPollAd',
            'bannerCredits',
            'vipBannerCredits',
            'autosurfCredits'
        ));

        $grid->getColumn('name')->setTitle('Name');
        $grid->getColumn('price')->setTitle('Price');
        $grid->getColumn('duration')->setTitle('Duration');
        $grid->getColumn('click')->setTitle('Click');
        $grid->getColumn('refClick')->setTitle('RClick');
        $grid->getColumn('refLimit')->setTitle('Ref. Limit');
        $grid->getColumn('rentedRefLimit')->setTitle('Rented Ref. Limit');
        $grid->getColumn('instPayment')->setTitle('Inst. Payment')->setSize(100);
        $grid->getColumn('videoClick')->setTitle('VClick');
        $grid->getColumn('pollClick')->setTitle('PClick');
        $grid->getColumn('maxClickInDay')->setTitle('MCDay');
        $grid->getColumn('maxVideoClickInDay')->setTitle('MVDay');
        $grid->getColumn('maxPollClickInDay')->setTitle('MPDay');
        $grid->getColumn('refVideoClick')->setTitle('RVClick');
        $grid->getColumn('refPollClick')->setTitle('RPClick');

        $editAction = new RowAction('edit', 'admin_setup_membership_settings');
        $editAction->setRouteParameters(array('id'));
        $grid->addRowAction($editAction);

        $showAction = new RowAction('show', '#');
        $showAction->setRouteParameters(array('id'));
        $grid->addRowAction($showAction);

        $massAction = new DeleteMassAction(true);
        $massAction->setConfirm(true);
        $grid->addMassAction($massAction);

        $em = $this->getDoctrine()->getManager();

        if ($id) {
            $membership = $em->getRepository('BuxUserBundle:Membership')->find($id);
        } else {
            $membership = new Membership();
            $price = new ReferralPrice();
            $price->setMinRef(0);
            $price->setMaxRef(250);
            $membership->addReferralPrice($price);
            $price = new ReferralPrice();
            $price->setMinRef(251);
            $price->setMaxRef(500);
            $membership->addReferralPrice($price);
            $price = new ReferralPrice();
            $price->setMinRef(501);
            $price->setMaxRef(750);
            $membership->addReferralPrice($price);
            $price = new ReferralPrice();
            $price->setMinRef(751);
            $price->setMaxRef(1000);
            $membership->addReferralPrice($price);
            $price = new ReferralPrice();
            $price->setMinRef(1001);
            $price->setMaxRef(1250);
            $membership->addReferralPrice($price);
            $price = new ReferralPrice();
            $price->setMinRef(1251);
            $price->setMaxRef(1500);
            $membership->addReferralPrice($price);
            $price = new ReferralPrice();
            $price->setMinRef(1501);
            $price->setMaxRef(1750);
            $membership->addReferralPrice($price);
            $price = new ReferralPrice();
            $price->setMinRef(1751);
            $price->setMaxRef(10000);
            $membership->addReferralPrice($price);

            $withdarw = new WithdrawSettings();
            $withdarw->setMembership($membership);
            $membership->setWithdrawSettings($withdarw);
        }
        $form = $this->createForm(new NewMembershipFormType(), $membership);

        if ($request->isMethod('POST')) {
            $form->handleRequest($request);
            if ($form->isValid()) {
                $data = $form->getData();
                $em->persist($data);
                $em->flush();

                $this->get('session')->getFlashBag()->add(
                    'success',
                    'Success!'
                );

                return $this->redirect($this->generateUrl('admin_setup_membership_settings'));
            } else {
                $this->get('session')->getFlashBag()->add(
                    'error',
                    'Error!'
                );
            }
        }

        return $grid->getGridResponse(array(
            'tab'   => $tab,
            'form'  => $form->createView()
        ), 'BuxAdminSetupBundle:Membership:membership_settings.html.twig');
    }
}