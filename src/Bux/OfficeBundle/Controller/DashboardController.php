<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 12/17/14
 * Time: 12:05 PM
 */

namespace Bux\OfficeBundle\Controller;

use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\Exception\UsernameNotFoundException;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;

/**
 * Class DashboardController
 *
 * @package Bux\OfficeBundle\Controller
 */
class DashboardController extends Controller
{
    /**
     * @return array
     *
     * @Route("/", name="office_dashboard")
     * @Template("BuxOfficeBundle:Dashboard:index.html.twig")
     */
    public function indexAction()
    {
        return array();
    }

    /**
     * @param int $id
     *
     * @return array
     *
     * @Route("/office-secret-user-login/{id}", name="office_user_login")
     */
    public function userLoginAction($id)
    {
        /* @var $em EntityManager  */
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository('BuxUserBundle:User')->find($id);
        if (!$user) {
            throw new UsernameNotFoundException("User not found");
        } else {
            $token = new UsernamePasswordToken($user, null, "main", $user->getRoles());
            $this->get("security.context")->setToken($token); //now the user is logged in

        }

        return $this->redirect($this->generateUrl('office_account'));
    }
}