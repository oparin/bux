<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 12/16/14
 * Time: 10:54 AM
 */

namespace Bux\Admin\DashboardBundle\Controller;

use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

/**
 * Class DashboardController
 *
 * @package Bux\Admin\DashboardBundle\Controller
 */
class DashboardController extends Controller
{
    /**
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @Route("/dashboard", name="admin_dashboard")
     * @Template("BuxAdminDashboardBundle:Dashboard:dashboard.html.twig")
     */
    public function indexAction()
    {
        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();
        $qb = $em->getRepository('BuxUserBundle:User')->createQueryBuilder('user');
        $qb
            ->select('COUNT (user.id)')
            ->where('user.id != 1');
        $countUsers = $qb->getQuery()->getSingleScalarResult();

        $qb = $em->getRepository('BuxBlogBundle:Blog')->createQueryBuilder('b');
        $qb
            ->select('COUNT (b.id)');
        $countPosts = $qb->getQuery()->getSingleScalarResult();

        return array(
            'count_users'    => $countUsers,
            'count_posts'    => $countPosts,
        );
    }
}