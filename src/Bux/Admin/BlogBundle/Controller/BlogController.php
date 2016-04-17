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
use Bux\Admin\BlogBundle\Form\Type\EditBlogFormType;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use APY\DataGridBundle\Grid\Action\DeleteMassAction;
use APY\DataGridBundle\Grid\Action\MassAction;
use APY\DataGridBundle\Grid\Action\RowAction;
use APY\DataGridBundle\Grid\Source\Entity;
use APY\DataGridBundle\Grid\Column\TextColumn;

/**
 * Class BlogController
 *
 * @package Bux\Admin\BlogBundle\Controller
 *
 * @Route("/blog")
 */
class BlogController extends Controller
{
    /**
     * @param Request $request
     *
     * @return array
     *
     * @Route("/manage", name="admin_blog_manage")
     */
    public function manageAction(Request $request)
    {
	    $source     = new Entity('BuxBlogBundle:Blog');
        $grid       = $this->get('grid');
		$tableAlias = $source->getTableAlias();

        $source->manipulateQuery(
            function ($query) use ($tableAlias)
            {
                /* @var $query \Doctrine\ORM\QueryBuilder */
                $query
                    ->orderBy($tableAlias . '.id', 'DESC');
            }
        );
        $grid->setSource($source);

        $grid->hideColumns(array(
            'id',
			'text',
        ));
		
		$membership = new TextColumn(array(
            'id'    => 'username',
            'field' => 'user.username',
            'title' => 'User',
            'source'    => true
        ));

        $grid->addColumn($membership, 3);
		
		$massAction = new DeleteMassAction(true);
        $massAction->setConfirm(true);
        $grid->addMassAction($massAction);
		
		$editAction = new RowAction('view', 'show_user_post');
        $editAction->setRouteParameters(array('username', 'id'));
        $grid->addRowAction($editAction);
		
		$editAction = new RowAction('edit', 'admin_blog_edit_blog');
        $editAction->setRouteParameters(array('id'));
        $grid->addRowAction($editAction);
		
        return $grid->getGridResponse('BuxAdminBlogBundle::manage.html.twig');
    }
	
	/**
     * @param Request $request
     * @param int     $id
     *
     * @return array
     *
     * @Route("/edit/{id}", name="admin_blog_edit_blog")
     * @Template("BuxAdminBlogBundle::edit.html.twig")
     */
    public function editBlogAction(Request $request, $id = null)
    {
        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();

        $post = $em->getRepository('BuxBlogBundle:Blog')->find($id);

        $form   = $this->createForm(new EditBlogFormType(), $post);

        if ($request->isMethod('POST')) {
            $form->handleRequest($request);
            if ($form->isValid()) {
                /* @var $user User */
                $user = $form->getData();
                if (!$id) {
                    /* @var $user User */
                    $user->setEnabled(true);
                    $user->setRegistrationDate(new \DateTime());
                    $user->getWallet()->setUser($user);
                    $user->getPurchaseWallet()->setUser($user);
                    $user->getSurveyWalletBalance()->setUser($user);
                    $user->getSurveyWalletAvailableBalance()->setUser($user);

                    $credits = new VideoCredits();
                    $credits->setUser($user);
                    $em->persist($credits);

                    $credits = new PollCredits();
                    $credits->setUser($user);
                    $em->persist($credits);

                    $credits = new AutoSerfCredits();
                    $credits->setUser($user);
                    $em->persist($credits);

                    $credits = new BannerCredits();
                    $credits->setUser($user);
                    $em->persist($credits);

                    $credits = new BigBannerCredits();
                    $credits->setUser($user);
                    $em->persist($credits);

                    $blogSettings = new BlogUserSettings();
                    $blogSettings->setUpdatedAt(new \DateTime());
                    $blogSettings->setUser($user);
                    $em->persist($blogSettings);

                    $paymentMethods = $em->getRepository('BuxWalletBundle:PaymentMethod')->findAll();
                    foreach ($paymentMethods as $paymentMethod) {
                        $userAccount = new UserPaymentAccount();
                        $userAccount->setUser($user);
                        $userAccount->setPaymentMethod($paymentMethod);
                        $em->persist($userAccount);
                    }

                    $em->persist($user);
                }
                $em->flush();

                $this->get('session')->getFlashBag()->add(
                    'success',
                    'Success!'
                );

                return $this->redirect($this->generateUrl('admin_members_manage_members'));
            }
        }

        return array(
            'form'  => $form->createView()
        );
    }
}