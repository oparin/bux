<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/19/15
 * Time: 5:35 PM
 */

namespace Bux\Admin\AdvertisementsBundle\Controller;

use APY\DataGridBundle\Grid\Action\DeleteMassAction;
use APY\DataGridBundle\Grid\Action\MassAction;
use APY\DataGridBundle\Grid\Action\RowAction;
use APY\DataGridBundle\Grid\Source\Entity;
use Bux\Admin\AdvertisementsBundle\Form\Type\Banner\NewAdFormType;
use Bux\Admin\AdvertisementsBundle\Form\Type\Banner\PackagesFormType;
use Bux\Admin\AdvertisementsBundle\Form\Type\Banner\SettingsGeneralFormType;
use Bux\Admin\AdvertisementsBundle\Grid\Column\AdStatusColumn;
use Bux\AdvertiseBundle\Entity\BannerAd;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\Session;

/**
 * Class BannerController
 *
 * @package Bux\Admin\AdvertisementsBundle\Controller
 * @Route("/banner")
 */
class BannerController extends Controller
{
    /**
     * @param Request  $request
     * @param int|null $packageId
     *
     * @return array
     *
     * @Route("/settings/{packageId}", name="admin_advertisements_banner_settings")
     * @Template("BuxAdminAdvertisementsBundle:Banner:settings.html.twig")
     */
    public function autoSerfSettingsAction(Request $request, $packageId = null)
    {
        if ($request->get('tab')) {
            $tab = $request->get('tab');
        } else {
            $tab = 'general';
        }

        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();
        $generalSetting = $em->getRepository('BuxAdminAdvertisementsBundle:BannerGeneralSettings')->find(1);

        $qb = $em->getRepository('BuxAdminAdvertisementsBundle:BannerPackages')->createQueryBuilder('bp');
        $qb->orderBy('bp.credits', 'ASC');
        $packages = $qb->getQuery()->getResult();

        $generalForm    = $this->createForm(new SettingsGeneralFormType(), $generalSetting);

        if ($packageId) {
            $package = $em->getRepository('BuxAdminAdvertisementsBundle:BannerPackages')->find($packageId);
            $tab = 'package';
        } else {
            $package = null;
        }
        $packagesForm   = $this->createForm(new PackagesFormType(), $package);

        if ($request->isMethod('POST')) {
            $parameters = $request->request->all();
            if (isset($parameters['settings_general_form_type'])) {
                $generalForm->handleRequest($request);
                if ($generalForm->isValid()) {
                    $em->flush();
                    $tab = 'general';

                    $this->get('session')->getFlashBag()->add(
                        'success',
                        'Success!'
                    );
                }
            }

            if (isset($parameters['packages_form_type'])) {
                $packagesForm->handleRequest($request);
                if ($packagesForm->isValid()) {
                    $data = $packagesForm->getData();
                    $tab = 'package';
                    $exist = $em->getRepository('BuxAdminAdvertisementsBundle:BannerPackages')->findOneBy(array(
                        'credits'   => $data->getCredits()
                    ));
                    if ($exist && $exist->getId() != $packageId) {
                        $this->get('session')->getFlashBag()->add(
                            'error',
                            'Already Exists!'
                        );
                    } else {
                        $em->persist($data);
                        $em->flush();


                        $this->get('session')->getFlashBag()->add(
                            'success',
                            'Success!'
                        );

                        return $this->redirect($this->generateUrl('admin_advertisements_banner_settings') . '?tab=package');
                    }
                }
            }
        }

        return array(
            'tab'               => $tab,
            'general_form'      => $generalForm->createView(),
            'packages_form'     => $packagesForm->createView(),
            'packages'          => $packages,
        );
    }

    /**
     * @param int $id
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     *
     * @Route("/settings-delete-banner-package/{id}", name="admin_advertisements_banner_delete_package")
     */
    public function deleteAutoSerfPackage($id)
    {
        $em = $this->getDoctrine()->getManager();
        $package = $em->getRepository('BuxAdminAdvertisementsBundle:BannerPackages')->find($id);
        $em->remove($package);
        $em->flush();

        return $this->redirect($this->generateUrl('admin_advertisements_banner_settings') . '?tab=package');
    }

    /**
     * @param Request  $request
     * @param int|null $id
     *
     * @return array
     *
     * @Route("/new-banner-ad/{id}", name="admin_advertisements_banner_new_ad")
     * @Template("BuxAdminAdvertisementsBundle:Banner:new.html.twig")
     */
    public function newBannerAd(Request $request, $id = null)
    {
        $em = $this->getDoctrine()->getManager();
        if ($id) {
            $ad = $em->getRepository('BuxAdvertiseBundle:BannerAd')->find($id);
        } else {
            $ad = null;
        }

        $form = $this->createForm(new NewAdFormType(), $ad);

        if ($request->isMethod('POST')) {
            $form->handleRequest($request);
            if ($form->isValid()) {
                $data   = $form->getData();
                $data->setUser($this->getUser());
                $data->setValidate(true);
                $em->persist($data);
                $em->flush();

                $this->get('session')->getFlashBag()->add(
                    'success',
                    'Success!'
                );

                return $this->redirect($this->generateUrl('admin_advertisements_banner_manage_ads'));
            }
        }

        return array(
            'form'  => $form->createView()
        );
    }

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @Route("/manage-banner-ads", name="admin_advertisements_banner_manage_ads")
     */
    public function manageAutoSerfAdsAction()
    {
        $source     = new Entity('BuxAdvertiseBundle:BannerAd');
        $grid       = $this->get('grid');
        $grid->setSource($source);

        $grid->hideColumns(array(
            'id',
            'pause',
            'bannerUrl'
        ));

        $grid->getColumn('title')->setTitle('Ad');
        $grid->getColumn('clicks')->setTitle('Clicks');
        $grid->getColumn('views')->setTitle('Views');
        $grid->getColumn('credits')->setTitle('Credits');
        $grid->getColumn('validate')->setTitle('Validate');
        $grid->getColumn('targetUrl')->setTitle('Target Url');

        $status = new AdStatusColumn(array(
            'id'        => 'pause',
//            'field'     => 'pause',
            'title'     => 'Status',
//            'source'    => true
        ));
        $status->setSize(50)->setAlign('center');
        $grid->addColumn($status);

        $editAction = new RowAction('edit', 'admin_advertisements_banner_new_ad');
        $editAction->setRouteParameters(array('id'));
        $grid->addRowAction($editAction);

        $massAction = new DeleteMassAction(true);
        $massAction->setConfirm(true);
        $grid->addMassAction($massAction);

        $setPause = new MassAction('Set Pause', 'Bux\Admin\AdvertisementsBundle\Controller\BannerController::setPause', true, array('em' => $this->getDoctrine()->getManager()), null);
        $grid->addMassAction($setPause);

        $setPause = new MassAction('Set Active', 'Bux\Admin\AdvertisementsBundle\Controller\BannerController::setActive', true, array('em' => $this->getDoctrine()->getManager()), null);
        $grid->addMassAction($setPause);

        return $grid->getGridResponse('BuxAdminAdvertisementsBundle:Banner:manage.html.twig');
    }

    /**
     * @param array   $primaryKeys
     * @param boolean $allPrimaryKeys
     * @param Session $session
     * @param array   $parameters
     */
    static public function setPause($primaryKeys, $allPrimaryKeys, $session, $parameters)
    {
        /* @var $em EntityManager */
        $em = $parameters['em'];
        foreach ($primaryKeys as $bannerAdId) {
            /* @var $bannerAd BannerAd */
            $bannerAd = $em->getRepository('BuxAdvertiseBundle:BannerAd')->find($bannerAdId);
            $bannerAd->setPause(true);
        }
        $em->flush();

        $session->getFlashBag()->add(
            'success',
            'Success!'
        );
    }

    /**
     * @param array   $primaryKeys
     * @param boolean $allPrimaryKeys
     * @param Session $session
     * @param array   $parameters
     */
    static public function setActive($primaryKeys, $allPrimaryKeys, $session, $parameters)
    {
        /* @var $em EntityManager */
        $em = $parameters['em'];
        foreach ($primaryKeys as $bannerAdId) {
            /* @var $bannerAd BannerAd */
            $bannerAd = $em->getRepository('BuxAdvertiseBundle:BannerAd')->find($bannerAdId);
            $bannerAd->setPause(false);
        }
        $em->flush();

        $session->getFlashBag()->add(
            'success',
            'Success!'
        );
    }
}