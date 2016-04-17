<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 12/24/14
 * Time: 11:56 AM
 */

namespace Bux\Admin\HomeBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use APY\DataGridBundle\Grid\Source\Entity;

/**
 * Class LoginLogController
 *
 * @package Bux\Admin\HomeBundle\Controller
 * @Route("/home")
 */
class LoginLogController extends Controller
{
    /**
     * @return array
     *
     * @Route("/login-log", name="admin_home_login_log")
     */
    public function loginLogAction()
    {
        $source = new Entity('BuxAdminHomeBundle:LoginLog');
        $grid   = $this->get('grid');

        $grid->setSource($source);
        $grid->hideFilters();
        $grid->hideColumns(array(
            'id'
        ));

        $grid->getColumn('status')->setTitle('Status')->setAlign('center');
        $grid->getColumn('login')->setTitle('Login');
        $grid->getColumn('userAgent')->setTitle('User Agent')->setSize(575);
        $grid->getColumn('ipAddress')->setTitle('Ip Address');
        $grid->getColumn('date')->setTitle('Date');

        return $grid->getGridResponse('BuxAdminHomeBundle:LoginLog:login_log.html.twig');
    }
}