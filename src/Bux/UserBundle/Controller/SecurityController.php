<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 12/16/14
 * Time: 11:52 AM
 */

namespace Bux\UserBundle\Controller;

use FOS\UserBundle\Controller\SecurityController as BaseController;

/**
 * Class SecurityController
 *
 * @package Bux\UserBundle\Controller
 */
class SecurityController extends BaseController
{
    /**
     * @param array $data
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function renderLogin(array $data)
    {
        $requestAttributes = $this->container->get('request')->attributes;

        if ('admin_login' === $requestAttributes->get('_route')) {
            $template = sprintf('BuxAdminDashboardBundle:Security:login.html.twig');
        } else {
            $template = sprintf('FOSUserBundle:Security:login.html.twig');
        }

        return $this->container->get('templating')->renderResponse($template, $data);
    }
}