<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/3/15
 * Time: 12:26 PM
 */

namespace Bux\Admin\SetupBundle\Controller;

use Bux\Admin\SetupBundle\Form\Type\BuyReferralsSettings\PackagesFormType;
use Bux\Admin\SetupBundle\Form\Type\BuyReferralsSettings\SettingsFormType;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class BuyReferralsSettingsController
 *
 * @package Bux\Admin\SetupBundle\Controller
 */
class BuyReferralsSettingsController extends Controller
{
    /**
     * @param Request  $request
     * @param int|null $packageId
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     *
     * @Route("/buy-referrals-settings/{packageId}", name="admin_setup_buy_referrals_settings")
     * @Template("BuxAdminSetupBundle:BuyReferralsSettings:buy_referrals_settings.html.twig")
     */
    public function buyReferralsSettingAction(Request $request, $packageId = null)
    {
        if ($request->get('tab')) {
            $tab = $request->get('tab');
        } else {
            $tab = 'package';
        }

        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();

        if ($packageId) {
            $package = $em->getRepository('BuxAdminSetupBundle:BuyReferralsSettingsPackages')->find($packageId);
        } else {
            $package = null;
        }
        $packagesForm   = $this->createForm(new PackagesFormType(), $package);
        $packages       = $em->getRepository('BuxAdminSetupBundle:BuyReferralsSettingsPackages')->findAll();

        $settings       = $em->getRepository('BuxAdminSetupBundle:BuyReferralsSettings')->find(1);
        $settingsForm   = $this->createForm(new SettingsFormType(), $settings);

        if ($request->isMethod('POST')) {
            $parameters = $request->request->all();
            if (isset($parameters['packages_form_type'])) {
                $packagesForm->handleRequest($request);
                if ($packagesForm->isValid()) {
                    $data = $packagesForm->getData();

                    $em->persist($data);
                    $em->flush();

                    $this->get('session')->getFlashBag()->add(
                        'success',
                        'Success!'
                    );

                    return $this->redirect($this->generateUrl('admin_setup_buy_referrals_settings') . '?tab=package');
                }
            }

            if (isset($parameters['settings_form_type'])) {
                $settingsForm->handleRequest($request);
                if ($settingsForm->isValid()) {
                    $em->flush();

                    $this->get('session')->getFlashBag()->add(
                        'success',
                        'Success!'
                    );

                    return $this->redirect($this->generateUrl('admin_setup_buy_referrals_settings') . '?tab=settings');
                }
            }
        }

        return array(
            'tab'   => $tab,
            'packages_form' => $packagesForm->createView(),
            'packages'      => $packages,
            'settings_form' => $settingsForm->createView()
        );
    }

    /**
     * @param int $id
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     *
     * @Route("/buy-referrals-settings/delete-package/{id}", name="admin_setup_buy_referrals_settings_delete_package")
     */
    public function deletePackageAction($id)
    {
        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();

        $package = $em->getRepository('BuxAdminSetupBundle:BuyReferralsSettingsPackages')->find($id);
        $em->remove($package);
        $em->flush();

        return $this->redirect($this->generateUrl('admin_setup_buy_referrals_settings') . '?tab=package');
    }
}