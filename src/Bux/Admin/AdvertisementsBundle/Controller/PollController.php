<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/21/15
 * Time: 12:56 PM
 */

namespace Bux\Admin\AdvertisementsBundle\Controller;

use APY\DataGridBundle\Grid\Action\DeleteMassAction;
use APY\DataGridBundle\Grid\Action\MassAction;
use APY\DataGridBundle\Grid\Action\RowAction;
use APY\DataGridBundle\Grid\Source\Entity;
use Bux\Admin\AdvertisementsBundle\Form\Type\Poll\CategoriesFormType;
use Bux\Admin\AdvertisementsBundle\Form\Type\Poll\NewAdFormType;
use Bux\Admin\AdvertisementsBundle\Form\Type\Poll\PackagesFormType;
use Bux\Admin\AdvertisementsBundle\Form\Type\Poll\SettingGeneralFormType;
use Bux\Admin\AdvertisementsBundle\Grid\Column\AdStatusColumn;
use Bux\AdvertiseBundle\Entity\PollAd;
use Bux\AdvertiseBundle\Entity\PollAdAnswer;
use Bux\BlogBundle\Entity\BlogUserSettings;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\Session;

/**
 * Class PollController
 *
 * @package Bux\Admin\AdvertisementsBundle\Controller
 * @Route("/poll")
 */
class PollController extends Controller
{
    /**
     * @param Request  $request
     * @param int|null $packageId
     * @param int|null $categoryId
     *
     * @return array
     *
     * @Route("/settings/{packageId}/{categoryId}", name="admin_advertisements_poll_settings")
     * @Template("BuxAdminAdvertisementsBundle:Poll:settings.html.twig")
     */
    public function pollSettingsAction(Request $request, $packageId = null, $categoryId = null)
    {
        $tab = 'general';

        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();
        $generalSetting = $em->getRepository('BuxAdminAdvertisementsBundle:PollGeneralSettings')->find(1);

        $qb = $em->getRepository('BuxAdminAdvertisementsBundle:PollPackages')->createQueryBuilder('pp');
        $qb->orderBy('pp.credits', 'ASC');
        $packages = $qb->getQuery()->getResult();

        $qb = $em->getRepository('BuxAdminAdvertisementsBundle:PollCategories')->createQueryBuilder('pc');
        $qb->orderBy('pc.id', 'ASC');
        $categories = $qb->getQuery()->getResult();

        $generalForm    = $this->createForm(new SettingGeneralFormType(), $generalSetting);
        if ($packageId) {
            $package = $em->getRepository('BuxAdminAdvertisementsBundle:PollPackages')->find($packageId);
            $tab = 'package';
        } else {
            $package = null;
        }
        $packagesForm   = $this->createForm(new PackagesFormType(), $package);

        if ($categoryId) {
            $category = $em->getRepository('BuxAdminAdvertisementsBundle:PollCategories')->find($categoryId);
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

                        return $this->redirect($this->generateUrl('admin_advertisements_poll_settings'));
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

                        return $this->redirect($this->generateUrl('admin_advertisements_poll_settings'));
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
     * @Route("/settings-delete-poll-package/{id}", name="admin_advertisements_poll_delete_package")
     */
    public function deletePollPackage($id)
    {
        $em = $this->getDoctrine()->getManager();
        $package = $em->getRepository('BuxAdminAdvertisementsBundle:PollPackages')->find($id);
        $em->remove($package);
        $em->flush();

        return $this->redirect($this->generateUrl('admin_advertisements_poll_settings'));
    }

    /**
     * @param int $id
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     *
     * @Route("/settings-delete-poll-category/{id}", name="admin_advertisements_poll_delete_category")
     */
    public function deletePollCategory($id)
    {
        $em = $this->getDoctrine()->getManager();
        $package = $em->getRepository('BuxAdminAdvertisementsBundle:PollCategories')->find($id);
        $em->remove($package);
        $em->flush();

        return $this->redirect($this->generateUrl('admin_advertisements_poll_settings'));
    }

    /**
     * @param Request  $request
     * @param int|null $id
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     *
     * @Route("/new-poll-ad/{id}", name="admin_advertisements_poll_new_ad")
     * @Template("BuxAdminAdvertisementsBundle:Poll:new.html.twig")
     */
    public function newPollAdAction(Request $request, $id = null)
    {
        $em     = $this->getDoctrine()->getManager();

        if ($id) {
            $question = $em->getRepository('BuxAdvertiseBundle:PollAd')->find($id);
        } else {
            $question = new PollAd();
            $question->addAnswer(new PollAdAnswer());
            $question->addAnswer(new PollAdAnswer());
            $question->addAnswer(new PollAdAnswer());
            $question->addAnswer(new PollAdAnswer());
        }

        $form = $this->createForm(new NewAdFormType(), $question);

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

                return $this->redirect($this->generateUrl('admin_advertisements_poll_settings'));
            }
        }

        return array(
            'form'  => $form->createView()
        );
    }

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @Route("/manage-poll-ads", name="admin_advertisements_poll_manage_ads")
     */
    public function managePollAdsAction()
    {
        $source     = new Entity('BuxAdvertiseBundle:PollAd');
        $grid       = $this->get('grid');
        $grid->setSource($source);

        $grid->hideColumns(array(
            'id',
            'description',
            'question',
            'pause',
            'maxClickInDay',
        ));

        $grid->getColumn('title')->setTitle('Ad');
        $grid->getColumn('clicks')->setTitle('Clicks');
        $grid->getColumn('outside')->setTitle('Outside');
        $grid->getColumn('credits')->setTitle('Credits');
        $grid->getColumn('validate')->setTitle('Validate');

        $status = new AdStatusColumn(array(
            'id'        => 'pause',
//            'field'     => 'pause',
            'title'     => 'Status',
//            'source'    => true
        ));
        $status->setSize(50)->setAlign('center');
        $grid->addColumn($status);

        $editAction = new RowAction('edit', 'admin_advertisements_poll_new_ad');
        $editAction->setRouteParameters(array('id'));
        $grid->addRowAction($editAction);

        $massAction = new DeleteMassAction(true);
        $massAction->setConfirm(true);
        $grid->addMassAction($massAction);

        $setPause = new MassAction('Set Pause', 'Bux\Admin\AdvertisementsBundle\Controller\PollController::setPause', true, array('em' => $this->getDoctrine()->getManager()), null);
        $grid->addMassAction($setPause);

        $setPause = new MassAction('Set Active', 'Bux\Admin\AdvertisementsBundle\Controller\PollController::setActive', true, array('em' => $this->getDoctrine()->getManager()), null);
        $grid->addMassAction($setPause);

        return $grid->getGridResponse('BuxAdminAdvertisementsBundle:Poll:manage.html.twig');
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
            /* @var $polAd PollAd */
            $polAd = $em->getRepository('BuxAdvertiseBundle:PollAd')->find($polAdId);
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
            /* @var $polAd PollAd */
            $polAd = $em->getRepository('BuxAdvertiseBundle:PollAd')->find($polAdId);
            $polAd->setPause(false);
        }
        $em->flush();

        $session->getFlashBag()->add(
            'success',
            'Success!'
        );
    }
}