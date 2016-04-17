<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 12/17/14
 * Time: 1:23 PM
 */

namespace Bux\BlogBundle\Controller;

use Bux\Admin\BlogBundle\Entity\BlogSettings;
use Bux\BlogBundle\Entity\BlogCategory;
use Bux\BlogBundle\Entity\BlogUserSettings;
use Bux\BlogBundle\Form\Type\BlogSettingsFormType;
use Bux\BlogBundle\Form\Type\NewBlogFormType;
use Bux\UserBundle\Entity\User;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\HttpFoundation\File\File;

/**
 * Class BlogController
 *
 * @package Bux\BlogBundle\Controller
 *
 * @Route("/blog")
 */
class OfficeBlogController extends Controller
{
    /**
     * @param Request $request
     *
     * @return array
     *
     * @Route("/my-blogs", name="office_my_blogs")
     * @Template("BuxBlogBundle:Blog:my_blog.html.twig")
     */
    public function indexAction(Request $request)
    {
        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();
        $qb = $em->getRepository('BuxBlogBundle:Blog')->createQueryBuilder('b');
        $qb
            ->where('b.user = :user')
            ->orderBy('b.id', 'DESC')
            ->setParameter('user', $this->getUser());
        $query = $qb->getQuery();

        $paginator  = $this->get('knp_paginator');

        /* @var $pagination \Knp\Bundle\PaginatorBundle\Pagination\SlidingPagination */
        $pagination = $paginator->paginate(
            $query,
            $request->query->get('page', 1)/*page number*/,
            10/*limit per page*/
        );
        $pagination->setTemplate('BuxBlogBundle:Blog:office_pagination.html.twig');

        return array(
            'blogs' => $pagination
        );
    }

    /**
     * @param Request $request
     *
     * @return array
     *
     * @Route("/add-blog", name="office_add_blog")
     * @Template("BuxBlogBundle:Blog:add_blog.html.twig")
     */
    public function addBlog(Request $request)
    {
        $user = $this->getUser();

        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();
        $form = $this->createForm(new NewBlogFormType($this->getUser()));

        $category = $em->getRepository('BuxBlogBundle:BlogCategory')->findOneBy(array(
            'user'  => $user
        ));

        if ($request->isMethod('post')) {
            $form->handleRequest($request);
            if ($form->isValid()) {
                /* @var $blog \Bux\BlogBundle\Entity\Blog */
                $blog = $form->getData();
                $blog->setUser($this->getUser());
                $blog->setDate(new \DateTime());

                $em->persist($blog);
                $em->flush();

                $this->get('session')->getFlashBag()->add(
                    'success',
                    $this->get('translator')->trans('frontend.blogs.action.post_success')
                );

                return $this->redirect($this->generateUrl('office_my_blogs'), 301);
            }
        }

        return array(
            'form' => $form->createView(),
            'category'  => $category
        );
    }

    /**
     * @param Request $request
     * @param int     $id
     *
     * @return array
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
     *
     * @Route("/edit-blog/{id}", name="office_edit_blog")
     * @Template("BuxBlogBundle:Blog:edit_blog.html.twig")
     */
    public function blogEditAction(Request $request, $id)
    {

        $user = $this->getUser();
        $em = $this->getDoctrine()->getManager();
        $blog = $em->getRepository('BuxBlogBundle:Blog')
            ->findOneBy(array(
                'id'    => $id,
                'user'  => $user
            ));

        if (!$blog) {
            throw new NotFoundHttpException('Not Found!');
        }

        $form = $this->createForm(new NewBlogFormType($user), $blog, array(
            'action'    => $this->generateUrl('office_edit_blog', array('id' => $id)),
        ));

        if ($request->isMethod('post')) {
            $form->handleRequest($request);

            if ($form->isValid()) {
                $em = $this->getDoctrine()->getManager();
                $em->flush();

                $this->get('session')->getFlashBag()->add(
                    'success',
                    $this->get('translator')->trans('frontend.blogs.action.edit_success')
                );

                return $this->redirect($this->generateUrl('office_edit_blog', array('id' => $id)), 301);
            }
        }

        return array(
            'form'  => $form->createView(),
            'blog'  => $blog
        );
    }

    /**
     * @param int $id
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     *
     * @Route("/delete-blog/{id}", name="office_delete_blog")
     */
    public function deleteBlog($id)
    {
        $user   = $this->getUser();
        $em     = $this->getDoctrine()->getManager();
        $blog = $em->getRepository('BuxBlogBundle:Blog')
            ->findOneBy(array(
                'id'    => $id,
                'user'  => $user
            ));

        if (!$blog) {
            throw new NotFoundHttpException('Not Found!');
        }

        $em->remove($blog);
        $em->flush();

        return $this->redirect($this->getRequest()->headers->get('referer'));
    }

    /**
     * @param Request $request
     * @param string  $username
     *
     * @return array
     * @throws NotFoundHttpException
     *
     * @Route("/user/{username}", name="user_blog")
     * @Template("BuxBlogBundle:GeneralBlog:user_blogs.html.twig")
     */
    public function userBlogsAction(Request $request, $username)
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

        /* @var $qb \Doctrine\ORM\QueryBuilder */
        $qb = $em->getRepository('BuxBlogBundle:Blog')->createQueryBuilder('b');
        $qb->where('b.user = :user')
            ->setParameter('user', $user)
            ->orderBy('b.date', 'DESC');
        $query = $qb->getQuery();

        $paginator  = $this->get('knp_paginator');
        $blogs = $paginator->paginate(
            $query,
            $this->get('request')->query->get('page', 1)/*page number*/,
            10/*limit per page*/
        );

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
            'blogs'         => $blogs,
            'categories'    => $categories,
            'user'          => $user,
            'recent_posts'  => $recentPosts,
            'latest_posts'  => $latestPosts,
            'settings'      => $user->getBlogSettings(),
            'menu'          => $menu
        );
    }

    /**
     * @param Request $request
     *
     * @return array
     *
     * @Route("/settings", name="office_blog_settings")
     * @Template("BuxBlogBundle:Blog:settings.html.twig")
     */
    public function settingsAction(Request $request)
    {
        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();

        /* @var $user User */
        $user = $this->getUser();
        $form = $this->createForm(new BlogSettingsFormType(), $user->getBlogSettings());

        if ($request->isMethod('POST')) {

            $form->handleRequest($request);
            if ($form->isValid()) {
                /* @var $data BlogUserSettings */
                $data = $form->getData();
                if ($request->get('avatar_change')) {
                    $x = $request->get('avatarx');
                    $y = $request->get('avatary');
                    $w = $request->get('avatarw');
                    $h = $request->get('avatarh');

                    /* @var $avatarFile UploadedFile */
                    $avatarFile = $data->getAvatarFile();
                    $src = $avatarFile->getRealPath();
                    $imgR = imagecreatefromjpeg($src);
                }

                if ($request->get('header_change')) {
                    $headerX = $request->get('headerx');
                    $headerY = $request->get('headery');
                    $headerW = $request->get('headerw');
                    $headerH = $request->get('headerh');

                    /* @var $headerFile UploadedFile */
                    $headerFile = $data->getHeaderFile();
//                    dump($headerFile);exit;
                    $src = $headerFile->getRealPath();
                    $headerR = imagecreatefromjpeg($src);
                }

                $em->persist($data);
                $em->flush();

                if ($request->get('avatar_change')) {
                    $targW = $targH = 172;
                    $dstR = imagecreatetruecolor($targW, $targH);
                    imagecopyresampled($dstR, $imgR, 0, 0, $x, $y, $targW, $targH, $w, $h);
                    imagejpeg($dstR, 'uploads/user/blog/avatar/' . $avatarFile->getClientOriginalName());
                }

                if ($request->get('header_change')) {
                    $dstR = imagecreatetruecolor(960, 265);
                    imagecopyresampled($dstR, $headerR, 0, 0, $headerX, $headerY, 960, 265, $headerW, $headerH);
                    imagejpeg($dstR, 'uploads/user/blog/header/' . $headerFile->getClientOriginalName());
                }

                $this->get('session')->getFlashBag()->add(
                    'success',
                    'Success!'
                );

                return $this->redirect($this->generateUrl('office_blog_settings'));
            }
        }

        return array(
            'form'  => $form->createView()
        );
    }
}