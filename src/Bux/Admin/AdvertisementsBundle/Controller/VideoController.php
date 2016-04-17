<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/10/15
 * Time: 3:39 PM
 */

namespace Bux\Admin\AdvertisementsBundle\Controller;

use APY\DataGridBundle\Grid\Action\DeleteMassAction;
use APY\DataGridBundle\Grid\Action\MassAction;
use APY\DataGridBundle\Grid\Action\RowAction;
use APY\DataGridBundle\Grid\Source\Entity;
use Bux\Admin\AdvertisementsBundle\Form\Type\Video\CategoriesFormType;
use Bux\Admin\AdvertisementsBundle\Form\Type\Video\NewAdFormType;
use Bux\Admin\AdvertisementsBundle\Form\Type\Video\PackagesFormType;
use Bux\Admin\AdvertisementsBundle\Form\Type\Video\SettingsGeneralFormType;
use Bux\Admin\AdvertisementsBundle\Grid\Column\AdStatusColumn;
use Bux\AdvertiseBundle\Entity\VideoAd;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\Session;

/**
 * Class VideoController
 *
 * @package Bux\Admin\AdvertisementsBundle\Controller
 * @Route("/video")
 */
class VideoController extends Controller
{
    /**
     * @param Request  $request
     * @param int|null $packageId
     * @param int|null $categoryId
     *
     * @return array
     *
     * @Route("/settings/{packageId}/{categoryId}", name="admin_advertisements_video_settings")
     * @Template("BuxAdminAdvertisementsBundle:Video:settings.html.twig")
     */
    public function videoSettingsAction(Request $request, $packageId = null, $categoryId = null)
    {
        $tab = 'general';

        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();
        $generalSetting = $em->getRepository('BuxAdminAdvertisementsBundle:VideoGeneralSettings')->find(1);

        $qb = $em->getRepository('BuxAdminAdvertisementsBundle:VideoPackages')->createQueryBuilder('vp');
        $qb->orderBy('vp.credits', 'ASC');
        $packages = $qb->getQuery()->getResult();

        $qb = $em->getRepository('BuxAdminAdvertisementsBundle:VideoCategories')->createQueryBuilder('vc');
        $qb->orderBy('vc.id', 'ASC');
        $categories = $qb->getQuery()->getResult();

        $generalForm    = $this->createForm(new SettingsGeneralFormType(), $generalSetting);
        if ($packageId) {
            $package = $em->getRepository('BuxAdminAdvertisementsBundle:VideoPackages')->find($packageId);
            $tab = 'package';
        } else {
            $package = null;
        }
        $packagesForm   = $this->createForm(new PackagesFormType(), $package);

        if ($categoryId) {
            $category = $em->getRepository('BuxAdminAdvertisementsBundle:VideoCategories')->find($categoryId);
            $tab = 'category';
        } else {
            $category = null;
        }
        $categoriesForm = $this->createForm(new CategoriesFormType(), $category);

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
                    $exist = $em->getRepository('BuxAdminAdvertisementsBundle:VideoPackages')->findOneBy(array(
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

                        return $this->redirect($this->generateUrl('admin_advertisements_video_settings'));
                    }
                }
            }

            if (isset($parameters['categories_form_type'])) {
                $categoriesForm->handleRequest($request);
                if ($categoriesForm->isValid()) {
                    $data = $categoriesForm->getData();
                    $tab = 'category';
                    $exist = $em->getRepository('BuxAdminAdvertisementsBundle:VideoCategories')->findOneBy(array(
                        'name'   => $data->getName()
                    ));
                    if ($exist && $exist->getId() != $categoryId) {
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

                        return $this->redirect($this->generateUrl('admin_advertisements_video_settings'));
                    }
                }
            }
        }

        return array(
            'tab'               => $tab,
            'general_form'      => $generalForm->createView(),
            'packages_form'     => $packagesForm->createView(),
            'packages'          => $packages,
            'categories_form'   => $categoriesForm->createView(),
            'categories'        => $categories,
        );
    }

    /**
     * @param int $id
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     *
     * @Route("/settings-delete-video-package/{id}", name="admin_advertisements_video_delete_package")
     */
    public function deleteVideoPackage($id)
    {
        $em = $this->getDoctrine()->getManager();
        $package = $em->getRepository('BuxAdminAdvertisementsBundle:VideoPackages')->find($id);
        $em->remove($package);
        $em->flush();

        return $this->redirect($this->generateUrl('admin_advertisements_video_settings'));
    }

    /**
     * @param int $id
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     *
     * @Route("/settings-delete-video-category/{id}", name="admin_advertisements_video_delete_category")
     */
    public function deleteVideoCategory($id)
    {
        $em = $this->getDoctrine()->getManager();
        $package = $em->getRepository('BuxAdminAdvertisementsBundle:VideoCategories')->find($id);
        $em->remove($package);
        $em->flush();

        return $this->redirect($this->generateUrl('admin_advertisements_video_settings'));
    }

    /**
     * @param Request  $request
     * @param int|null $id
     *
     * @return array
     *
     * @Route("/new-video-ad/{id}", name="admin_advertisements_video_new_ad")
     * @Template("BuxAdminAdvertisementsBundle:Video:new.html.twig")
     */
    public function newAutoSerfAd(Request $request, $id = null)
    {
        $em = $this->getDoctrine()->getManager();
        if ($id) {
            $ad = $em->getRepository('BuxAdvertiseBundle:VideoAd')->find($id);
        } else {
            $ad = null;
        }

        $form = $this->createForm(new NewAdFormType(), $ad);

        if ($request->isMethod('POST')) {
            $form->handleRequest($request);
            if ($form->isValid()) {
                $data   = $form->getData();
                $data->setValidate(true);
                $em->persist($data);
                $em->flush();

                $this->get('session')->getFlashBag()->add(
                    'success',
                    'Success!'
                );

                return $this->redirect($this->generateUrl('admin_advertisements_video_manage_ads'));
            }
        }

        return array(
            'form'  => $form->createView()
        );
    }

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @Route("/manage-video-ads", name="admin_advertisements_video_manage_ads")
     */
    public function manageAutoSerfAdsAction()
    {
        $source     = new Entity('BuxAdvertiseBundle:VideoAd');
        $grid       = $this->get('grid');
        $grid->setSource($source);

        $grid->hideColumns(array(
            'id',
            'pause',
            'maxClickInDay',
        ));

        $grid->getColumn('title')->setTitle('Ad');
        $grid->getColumn('clicks')->setTitle('Clicks');
        $grid->getColumn('outside')->setTitle('Outside');
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

        $editAction = new RowAction('edit', 'admin_advertisements_video_new_ad');
        $editAction->setRouteParameters(array('id'));
        $grid->addRowAction($editAction);

        $massAction = new DeleteMassAction(true);
        $massAction->setConfirm(true);
        $grid->addMassAction($massAction);

        $setPause = new MassAction('Set Pause', 'Bux\Admin\AdvertisementsBundle\Controller\VideoController::setPause', true, array('em' => $this->getDoctrine()->getManager()), null);
        $grid->addMassAction($setPause);

        $setPause = new MassAction('Set Active', 'Bux\Admin\AdvertisementsBundle\Controller\VideoController::setActive', true, array('em' => $this->getDoctrine()->getManager()), null);
        $grid->addMassAction($setPause);

        return $grid->getGridResponse('BuxAdminAdvertisementsBundle:Video:manage.html.twig');
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
        foreach ($primaryKeys as $videoAdId) {
            /* @var $polAd VideoAd */
            $videoAd = $em->getRepository('BuxAdvertiseBundle:VideoAd')->find($videoAdId);
            $videoAd->setPause(true);
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
        foreach ($primaryKeys as $videoAdId) {
            /* @var $polAd VideoAd */
            $videoAd = $em->getRepository('BuxAdvertiseBundle:VideoAd')->find($videoAdId);
            $videoAd->setPause(false);
        }
        $em->flush();

        $session->getFlashBag()->add(
            'success',
            'Success!'
        );
    }
}