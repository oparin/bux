<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 12/24/14
 * Time: 6:27 PM
 */

namespace Bux\Admin\HomeBundle\Controller;

use Bux\Admin\HomeBundle\Form\Type\PasswordFormType;
use Bux\Admin\HomeBundle\Form\Type\ProfileFormType;
use Bux\Admin\HomeBundle\Form\Type\UserFormType;
use Bux\UserBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class MyAccountController
 *
 * @package Bux\Admin\HomeBundle\Controller
 * @Route("/home")
 */
class MyAccountController extends Controller
{
    /**
     * @param Request $request
     *
     * @return array
     *
     * @Route("/my-account", name="admin_home_my_account")
     * @Template("BuxAdminHomeBundle:MyAccount:my_account.html.twig")
     */
    public function profileAction(Request $request)
    {
        $tab = 'profile';
        /* @var $user User */
        $user = $this->getUser();
        $profileForm = $this->createForm(new ProfileFormType(), $user->getAdminSettings());
        $passwordForm = $this->createForm(new PasswordFormType(), $user);

        if ($request->isMethod('POST')) {
            $em = $this->getDoctrine()->getManager();
            if ($request->request->has('admin_home_profile_form_type')) {
                $profileForm->handleRequest($request);
                $tab = 'profile';
                if ($profileForm->isValid()) {
                    $em->flush();

                    $this->get('session')->getFlashBag()->add(
                        'success',
                        'Success!'
                    );
                } else {
                    $this->get('session')->getFlashBag()->add(
                        'error',
                        'Error!'
                    );
                }
            }
            if ($request->request->has('admin_home_password_form_type')) {
                $passwordForm->handleRequest($request);
                $tab = 'password';
                if ($passwordForm->isValid()) {
                    $em->flush();

                    $this->get('session')->getFlashBag()->add(
                        'success',
                        'Success!'
                    );
                } else {
                    $this->get('session')->getFlashBag()->add(
                        'error',
                        'Error!'
                    );
                }
            }
        }

        return array(
            'profile_form'  => $profileForm->createView(),
            'password_form' => $passwordForm->createView(),
            'tab'           => $tab
        );
    }
}