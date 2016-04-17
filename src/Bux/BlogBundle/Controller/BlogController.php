<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 12/23/14
 * Time: 11:16 AM
 */

namespace Bux\BlogBundle\Controller;

use Bux\UserBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Class BlogController
 *
 * @package Bux\BlogBundle\Controller
 * @Route("/blog")
 */
class BlogController extends Controller
{
    /**
     * @param string  $username
     * @param int     $id
     *
     * @return array
     * @throws NotFoundHttpException
     *
     * @Route("/{username}/category/{id}", name="user_posts_category")
     * @Template("BuxBlogBundle:GeneralBlog:show_user_posts_by_category.html.twig")
     */
    public function showUserPostsByCategoryAction($username, $id)
    {
        /* @var $em \Doctrine\ORM\EntityManager */
        $em = $this->getDoctrine()->getManager();

        /* @var $user User */
        $user = $em->getRepository('BuxUserBundle:User')
            ->findOneBy(array(
                'username'  => $username
            ));

        if (!$user) {
            throw new NotFoundHttpException('Not Found!');
        }

        $category = $em->getRepository('BuxBlogBundle:BlogCategory')->find($id);

        if (!$category) {
            throw new NotFoundHttpException('Not Found!');
        }

        $categories = $user->getBlogCategories();

        $qb = $em->getRepository('BuxBlogBundle:Blog')->createQueryBuilder('b');
        $qb->where('b.user = :user')
            ->orderBy('b.date', 'DESC')
            ->setMaxResults(10)
            ->setParameter('user', $user);

        $recentPosts = $qb->getQuery()->getResult();

        $qb = $em->getRepository('BuxBlogBundle:Blog')->createQueryBuilder('b');
        $qb
            ->orderBy('b.date', 'DESC')
            ->setMaxResults(10);

        $latestPosts = $qb->getQuery()->getResult();

        /* @var $qb \Doctrine\ORM\QueryBuilder */
        $qb = $em->getRepository('BuxBlogBundle:Blog')->createQueryBuilder('b');
        $qb->where('b.user = :user')
            ->andWhere('b.category = :category')
            ->setParameter('user', $user)
            ->setParameter('category', $category)
            ->orderBy('b.date', 'DESC');
        $query = $qb->getQuery();

        $paginator  = $this->get('knp_paginator');
        $blogs = $paginator->paginate(
            $query,
            $this->get('request')->query->get('page', 1)/*page number*/,
            10/*limit per page*/
        );

        $menu = $em->getRepository('BuxAdminBlogBundle:BlogHeaderMenu')->findBy(array(
            'visible'   => true
        ), array('id' => 'DESC'));

        return array(
            'user'          => $user,
            'categories'    => $categories,
            'recent_posts'  => $recentPosts,
            'latest_posts'  => $latestPosts,
            'blogs'         => $blogs,
            'settings'      => $user->getBlogSettings(),
            'menu'          => $menu
        );
    }

    /**
     * @param string  $username
     * @param int     $id
     *
     * @return array
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
     *
     * @Route("/{username}/post/{id}", name="show_user_post")
     * @Template("BuxBlogBundle:GeneralBlog:show_user_post.html.twig")
     */
    public function showUserBlogAction($username, $id)
    {
        /* @var $em \Doctrine\ORM\EntityManager */
        $em = $this->getDoctrine()->getManager();

        /* @var $user User */
        $user = $em->getRepository('BuxUserBundle:User')
            ->findOneBy(array(
                'username'  => $username
            ));

        if (!$user) {
            throw new NotFoundHttpException('Not Found!');
        }

        $post = $em->getRepository('BuxBlogBundle:Blog')->find($id);

        if (!$post) {
            throw new NotFoundHttpException('Not Found!');
        }

        $categories = $user->getBlogCategories();

        $qb = $em->getRepository('BuxBlogBundle:Blog')->createQueryBuilder('b');
        $qb->where('b.user = :user')
            ->orderBy('b.date', 'DESC')
            ->setMaxResults(10)
            ->setParameter('user', $user);

        $recentPosts = $qb->getQuery()->getResult();

        $qb = $em->getRepository('BuxBlogBundle:Blog')->createQueryBuilder('b');
        $qb
            ->orderBy('b.date', 'DESC')
            ->setMaxResults(10);

        $latestPosts = $qb->getQuery()->getResult();

        $menu = $em->getRepository('BuxAdminBlogBundle:BlogHeaderMenu')->findBy(array(
            'visible'   => true
        ), array('id' => 'DESC'));

        return array(
            'post'          => $post,
            'categories'    => $categories,
            'user'          => $user,
            'recent_posts'  => $recentPosts,
            'latest_posts'  => $latestPosts,
            'settings'      => $user->getBlogSettings(),
            'menu'          => $menu
        );
    }
}