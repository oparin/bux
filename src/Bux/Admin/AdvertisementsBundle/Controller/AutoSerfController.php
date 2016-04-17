<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/23/15
 * Time: 2:29 PM
 */

namespace Bux\Admin\AdvertisementsBundle\Controller;

use APY\DataGridBundle\Grid\Action\DeleteMassAction;
use APY\DataGridBundle\Grid\Action\MassAction;
use APY\DataGridBundle\Grid\Action\RowAction;
use APY\DataGridBundle\Grid\Source\Entity;
use Bux\Admin\AdvertisementsBundle\Form\Type\AutoSerf\CategoriesFormType;
use Bux\Admin\AdvertisementsBundle\Form\Type\AutoSerf\NewAdFormType;
use Bux\Admin\AdvertisementsBundle\Form\Type\AutoSerf\PackagesFormType;
use Bux\Admin\AdvertisementsBundle\Form\Type\AutoSerf\SettingsGeneralFormType;
use Bux\Admin\AdvertisementsBundle\Grid\Column\AdStatusColumn;
use Bux\AdvertiseBundle\Entity\AutoSerfAd;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\Session;

/**
 * Class AutoSerfController
 *
 * @package Bux\Admin\AdvertisementsBundle\Controller
 * @Route("/auto-serf")
 */
class AutoSerfController extends Controller
{
    /**
     * @param Request  $request
     * @param int|null $packageId
     * @param int|null $categoryId
     *
     * @return array
     *
     * @Route("/settings/{packageId}/{categoryId}", name="admin_advertisements_auto_serf_settings")
     * @Template("BuxAdminAdvertisementsBundle:AutoSerf:settings.html.twig")
     */
    public function autoSerfSettingsAction(Request $request, $packageId = null, $categoryId = null)
    {
        $tab = 'general';

        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();
        $generalSetting = $em->getRepository('BuxAdminAdvertisementsBundle:AutoSerfGeneralSettings')->find(1);

        $qb = $em->getRepository('BuxAdminAdvertisementsBundle:AutoSerfPackages')->createQueryBuilder('ap');
        $qb->orderBy('ap.credits', 'ASC');
        $packages = $qb->getQuery()->getResult();

        $qb = $em->getRepository('BuxAdminAdvertisementsBundle:AutoSerfCategories')->createQueryBuilder('ac');
        $qb->orderBy('ac.id', 'ASC');
        $categories = $qb->getQuery()->getResult();

        $generalForm    = $this->createForm(new SettingsGeneralFormType(), $generalSetting);
        if ($packageId) {
            $package = $em->getRepository('BuxAdminAdvertisementsBundle:AutoSerfPackages')->find($packageId);
            $tab = 'package';
        } else {
            $package = null;
        }
        $packagesForm   = $this->createForm(new PackagesFormType(), $package);

        if ($categoryId) {
            $category = $em->getRepository('BuxAdminAdvertisementsBundle:AutoSerfCategories')->find($categoryId);
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
                    $exist = $em->getRepository('BuxAdminAdvertisementsBundle:PollPackages')->findOneBy(array(
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

                        return $this->redirect($this->generateUrl('admin_advertisements_auto_serf_settings'));
                    }
                }
            }

            if (isset($parameters['categories_form_type'])) {
                $categoriesForm->handleRequest($request);
                if ($categoriesForm->isValid()) {
                    $data = $categoriesForm->getData();
                    $tab = 'category';
                    $exist = $em->getRepository('BuxAdminAdvertisementsBundle:PollCategories')->findOneBy(array(
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

                        return $this->redirect($this->generateUrl('admin_advertisements_auto_serf_settings'));
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
     * @Route("/settings-delete-auto-serf-package/{id}", name="admin_advertisements_auto_serf_delete_package")
     */
    public function deleteAutoSerfPackage($id)
    {
        $em = $this->getDoctrine()->getManager();
        $package = $em->getRepository('BuxAdminAdvertisementsBundle:AutoSerfPackages')->find($id);
        $em->remove($package);
        $em->flush();

        return $this->redirect($this->generateUrl('admin_advertisements_auto_serf_settings'));
    }

    /**
     * @param int $id
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     *
     * @Route("/settings-delete-auto-serf-category/{id}", name="admin_advertisements_auto_serf_delete_category")
     */
    public function deleteAutoSerfCategory($id)
    {
        $em = $this->getDoctrine()->getManager();
        $package = $em->getRepository('BuxAdminAdvertisementsBundle:AutoSerfCategories')->find($id);
        $em->remove($package);
        $em->flush();

        return $this->redirect($this->generateUrl('admin_advertisements_auto_serf_settings'));
    }

    /**
     * @param Request  $request
     * @param int|null $id
     *
     * @return array
     *
     * @Route("/new-auto-serf-ad/{id}", name="admin_advertisements_auto_serf_new_ad")
     * @Template("BuxAdminAdvertisementsBundle:AutoSerf:new.html.twig")
     */
    public function newAutoSerfAd(Request $request, $id = null)
    {
        $em = $this->getDoctrine()->getManager();
        if ($id) {
            $ad = $em->getRepository('BuxAdvertiseBundle:AutoSerfAd')->find($id);
        } else {
            $ad = null;
        }

        $form = $this->createForm(new NewAdFormType(), $ad);

        if ($request->isMethod('POST')) {
            $form->handleRequest($request);
            if ($form->isValid()) {
                $data   = $form->getData();
//                $data->setUser($this->getUser());
                $data->setValidate(true);
                $em->persist($data);
                $em->flush();

                $this->get('session')->getFlashBag()->add(
                    'success',
                    'Success!'
                );

                return $this->redirect($this->generateUrl('admin_advertisements_auto_serf_manage_ads'));
            }
        }

        return array(
            'form'  => $form->createView()
        );
    }

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @Route("/manage-auto-serf-ads", name="admin_advertisements_auto_serf_manage_ads")
     */
    public function manageAutoSerfAdsAction()
    {
        $source     = new Entity('BuxAdvertiseBundle:AutoSerfAd');
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

        $editAction = new RowAction('edit', 'admin_advertisements_auto_serf_new_ad');
        $editAction->setRouteParameters(array('id'));
        $grid->addRowAction($editAction);

        $massAction = new DeleteMassAction(true);
        $massAction->setConfirm(true);
        $grid->addMassAction($massAction);

        $setPause = new MassAction('Set Pause', 'Bux\Admin\AdvertisementsBundle\Controller\AutoSerfController::setPause', true, array('em' => $this->getDoctrine()->getManager()), null);
        $grid->addMassAction($setPause);

        $setPause = new MassAction('Set Active', 'Bux\Admin\AdvertisementsBundle\Controller\AutoSerfController::setActive', true, array('em' => $this->getDoctrine()->getManager()), null);
        $grid->addMassAction($setPause);

        return $grid->getGridResponse('BuxAdminAdvertisementsBundle:AutoSerf:manage.html.twig');
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
        foreach ($primaryKeys as $polAdId) {
            /* @var $polAd AutoSerfAd */
            $polAd = $em->getRepository('BuxAdvertiseBundle:AutoSerfAd')->find($polAdId);
            $polAd->setPause(true);
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
        foreach ($primaryKeys as $polAdId) {
            /* @var $polAd AutoSerfAd */
            $polAd = $em->getRepository('BuxAdvertiseBundle:AutoSerfAd')->find($polAdId);
            $polAd->setPause(false);
        }
        $em->flush();

        $session->getFlashBag()->add(
            'success',
            'Success!'
        );
    }
}