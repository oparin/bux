<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 12/22/14
 * Time: 12:16 PM
 */

namespace Bux\BlogBundle\Controller;

use Bux\BlogBundle\Entity\BlogCategory;
use Bux\BlogBundle\Form\Type\NewPostCategoryFormType;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Class BlogCategoryController
 *
 * @package Bux\BlogBundle\Controller
 * @Route("/blog")
 */
class BlogCategoryController extends Controller
{
    /**
     * @param Request $request
     *
     * @return array
     *
     * @Route("/my-post-category", name="office_my_categories")
     * @Template("BuxBlogBundle:Blog:my_blog_category.html.twig")
     */
    public function myBlogCategoryAction(Request $request)
    {
        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();
        $qb = $em->getRepository('BuxBlogBundle:BlogCategory')->createQueryBuilder('bc');
        $qb
            ->where('bc.user = :user')
            ->orderBy('bc.id', 'DESC')
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
            'categories' => $pagination
        );
    }

    /**
     * @param Request $request
     *
     * @return array
     *
     * @Route("/add-post-category", name="office_add_post_category")
     * @Template("BuxBlogBundle:Blog:add_post_category.html.twig")
     */
    public function addBlogCategoryAction(Request $request)
    {
        $form = $this->createForm(new NewPostCategoryFormType(), null, array(
            'action'    => $this->generateUrl('office_add_post_category'),
            'attr'      => array(
                'class'     => 'form-horizontal'
            )
        ));

        if ($request->isMethod('post')) {
            $form->handleRequest($request);

            if ($form->isValid()) {
                /* @var $category BlogCategory */
                $category = $form->getData();
                $category->setUser($this->getUser());

                $em = $this->getDoctrine()->getManager();
                $em->persist($category);
                $em->flush();

                $this->get('session')->getFlashBag()->add(
                    'success',
                    $this->get('translator')->trans('frontend.blogs.action.new_category_success')
                );

                return $this->redirect($this->generateUrl('office_my_categories'), 301);
            }
        }

        return array(
            'form' => $form->createView()
        );
    }

    /**
     * @param Request $request
     * @param int     $id
     *
     * @return array
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
     *
     * @Route("/edit-post-category/{id}", name="office_edit_post_category")
     * @Template("BuxBlogBundle:Blog:edit_post_category.html.twig")
     */
    public function editCategoryAction(Request $request, $id)
    {
        $user   = $this->getUser();

        /* @var $em EntityManager */
        $em     = $this->getDoctrine()->getManager();
        $postCategory = $em->getRepository('BuxBlogBundle:BlogCategory')
            ->findOneBy(array(
                'id'    => $id,
                'user'  => $user
            ));

        if (!$postCategory) {
            throw new NotFoundHttpException('Not Found!');
        }

        $form = $this->createForm(new NewPostCategoryFormType(), $postCategory, array(
            'action'    => $this->generateUrl('office_edit_post_category', array('id' => $id)),
            'attr'      => array(
                'class'     => 'form-horizontal'
            )
        ));

        if ($request->isMethod('post')) {
            $form->handleRequest($request);

            if ($form->isValid()) {
                /* @var $blog \bux\BlogBundle\Entity\Blog */
                $blog = $form->getData();

                $em = $this->getDoctrine()->getManager();
                $em->flush();

                $this->get('session')->getFlashBag()->add(
                    'success',
                    $this->get('translator')->trans('frontend.blogs.action.edit_success')
                );

                return $this->redirect($this->generateUrl('office_edit_post_category', array('id' => $postCategory->getId())), 301);
            }
        }

        return array(
            'form' => $form->createView(),
            'category' => $postCategory
        );
    }

    /**
     * @param int $id
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     * @throws NotFoundHttpException
     *
     * @Route("/delete-post-category/{id}", name="office_delete_blog_category")
     */
    public function deleteCategory($id)
    {
        $user   = $this->getUser();
        $em     = $this->getDoctrine()->getManager();
        $blog = $em->getRepository('BuxBlogBundle:BlogCategory')
            ->findOneBy(array(
                'id'    => $id,
                'user'  => $user
            ));

        if (!$blog) {
            throw new NotFoundHttpException('Not Found!');
        }

        $em->remove($blog);
        $em->flush();

        $this->get('session')->getFlashBag()->add(
            'success',
            $this->get('translator')->trans('frontend.blogs.action.delete_success')
        );

        return $this->redirect($this->getRequest()->headers->get('referer'));
    }
}