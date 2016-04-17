<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 3/2/15
 * Time: 12:05 PM
 */

namespace Bux\Admin\SetupBundle\Controller;

use APY\DataGridBundle\Grid\Action\RowAction;
use APY\DataGridBundle\Grid\Source\Entity;
use Bux\Admin\SetupBundle\Form\Type\StaticPageFormType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class StaticPageController
 *
 * @package Bux\Admin\SetupBundle\Controller
 */
class StaticPageController extends Controller
{
    /**
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @Route("/all-static-page", name="admin_setup_all-static-page")
     */
    public function allStaticPageAction()
    {
        $source     = new Entity('BuxAdminSetupBundle:StaticPage');
        $grid       = $this->get('grid');
        $grid->setSource($source);

        $grid->hideColumns(array(
            'id',
            'content'
        ));

        $grid->getColumn('name')->setTitle('Name');

        $editAction = new RowAction('edit', 'admin_setup_edit_static_page');
        $editAction->setRouteParameters(array('id'));
        $grid->addRowAction($editAction);

        return $grid->getGridResponse(array(
        ), 'BuxAdminSetupBundle:StaticPage:all_static_page.html.twig');
    }

    /**
     * @param Request $request
     * @param int     $id
     *
     * @return array
     *
     * @Route("/edit-static-page/{id}", name="admin_setup_edit_static_page")
     * @Template("BuxAdminSetupBundle:StaticPage:edit_static_page.html.twig")
     */
    public function editStaticPageAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $page = $em->getRepository('BuxAdminSetupBundle:StaticPage')->find($id);

        $form = $this->createForm(new StaticPageFormType(), $page);

        if ($request->isMethod('POST')) {
            $form->handleRequest($request);
            if ($form->isValid()) {
                $em->flush();

                $this->get('session')->getFlashBag()->add(
                    'success',
                    'Success!'
                );

                return $this->redirect($this->generateUrl('admin_setup_edit_static_page', array('id' => $id)));
            }
        }

        return array(
            'form'  => $form->createView(),
            'page'  => $page
        );
    }
}