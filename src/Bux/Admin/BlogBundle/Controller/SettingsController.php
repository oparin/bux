<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 12/18/14
 * Time: 11:05 AM
 */

namespace Bux\Admin\BlogBundle\Controller;

use Bux\Admin\BlogBundle\Form\Type\BlogBannersFormType;
use Bux\Admin\BlogBundle\Form\Type\BlogHeaderMenuFormType;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class SettingsController
 *
 * @package Bux\Admin\BlogBundle\Controller
 *
 * @Route("/blog")
 */
class SettingsController extends Controller
{
    /**
     * @param Request $request
     *
     * @return array
     *
     * @Route("/settings", name="admin_blog_settings")
     * @Template("BuxAdminBlogBundle:Settings:settings.html.twig")
     */
    public function indexAction(Request $request)
    {
        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();
        $banners        = $em->getRepository('BuxAdminBlogBundle:BlogSettings')->find(1);
        $formBanners    = $this->createForm(new BlogBannersFormType(), $banners);

        $menu           = $em->getRepository('BuxAdminBlogBundle:BlogHeaderMenu')->findAll();
        $formHeaderMenu = $this->createForm(new BlogHeaderMenuFormType(), array('menu' => $menu));

        if ($request->isMethod('POST')) {
            $parameters = $request->request->all();
            if (isset($parameters['blog_banners_form_type'])) {
                $formBanners->handleRequest($request);
                if ($formBanners->isValid()) {
                    $em->flush();

                    $this->get('session')->getFlashBag()->add(
                        'success',
                        'Success!'
                    );
                }
            } elseif (isset($parameters['blog_header_menu_form_type'])) {
                $formHeaderMenu->handleRequest($request);
                if ($formHeaderMenu->isValid()) {
                    $em->flush();

                    $this->get('session')->getFlashBag()->add(
                        'success',
                        'Success!'
                    );
                }
            }
        }

        return array(
            'form_banners'      => $formBanners->createView(),
            'setting'   => $banners,
            'form_header_menu' => $formHeaderMenu->createView()
        );
    }
}