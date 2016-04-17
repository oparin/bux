<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 12/25/14
 * Time: 12:47 PM
 */

namespace Bux\Admin\HomeBundle\Controller;

use APY\DataGridBundle\Grid\Action\DeleteMassAction;
use APY\DataGridBundle\Grid\Action\RowAction;
use APY\DataGridBundle\Grid\Column\BooleanColumn;
use APY\DataGridBundle\Grid\Column\TextColumn;
use APY\DataGridBundle\Grid\Source\Entity;
use Bux\Admin\HomeBundle\Entity\AdminSettings;
use Bux\Admin\HomeBundle\Form\Type\EditAdministratorFormType;
use Bux\Admin\HomeBundle\Form\Type\NewAdministratorFormType;
use Bux\UserBundle\Entity\User;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Class ManageAdministratorsController
 *
 * @package Bux\Admin\HomeBundle\Controller
 * @Route("/home")
 */
class ManageAdministratorsController extends Controller
{
    /**
     * @return array
     *
     * @Route("/manage-administrators", name="admin_home_manage_administrators")
     */
    public function manageAdministratorsAction()
    {
        $source     = new Entity('BuxUserBundle:User');
        $grid       = $this->get('grid');
        $tableAlias = $source->getTableAlias();

        $source->manipulateQuery(
            function ($query) use ($tableAlias)
            {
                /* @var $query \Doctrine\ORM\QueryBuilder */
                $query
                    ->andWhere($tableAlias . '.roles = :roles')
                    ->setParameter('roles', serialize(array('ROLE_ADMIN')));
            }
        );
        $grid->setSource($source);
        $grid->hideColumns(array(
            'id',
            'usernameCanonical',
            'emailCanonical',
            'salt',
            'password',
            'confirmationToken',
            'passwordRequestedAt',
            'expired',
            'expiresAt',
            'credentialsExpired',
            'credentialsExpired',
            'credentialsExpireAt',
            'roles',
            'locked',
            'enabled',
            'country',
            'fullName',
            'registrationDate'
        ));

        $cm = new BooleanColumn(array(
            'id'    => 'enabled',
        ));

        $grid->addColumn($cm);

        $grid->getColumn('username')->setTitle('Username');
        $grid->getColumn('email')->setTitle('Email');
        $grid->getColumn('lastLogin')->setTitle('Last Login');
        $grid->getColumn('enabled')->setTitle('Status');

        $editAction = new RowAction('edit', 'admin_home_edit_administrator');
        $editAction->setRouteParameters(array('id'));
        $grid->addRowAction($editAction);

        $showAction = new RowAction('show', '#');
        $showAction->setRouteParameters(array('id'));
        $grid->addRowAction($showAction);

        $massAction = new DeleteMassAction(true);
        $grid->addMassAction($massAction);

        return $grid->getGridResponse('BuxAdminHomeBundle:ManageAdministrators:administrators_table.html.twig');
    }

    /**
     * @param Request $request
     *
     * @return array
     *
     * @Route("/show-administrator-info", name="admin_home_show_administrator_info")
     * @Template("BuxAdminHomeBundle:ManageAdministrators:show-administrator_info.html.twig")
     */
    public function showAdministartorInfoAction(Request $request)
    {
        $id = $request->get('id');

        /* @var $em EntityManager */
        $em     = $this->getDoctrine()->getManager();
        $user   = $em->getRepository('BuxUserBundle:User')->find($id);

        return array(
            'user' => $user
        );
    }

    /**
     * @param Request $request
     *
     * @return array
     *
     * @Route("/new-administrator", name="admin_home_new_administrator")
     * @Template("BuxAdminHomeBundle:ManageAdministrators:new_administrator.html.twig")
     */
    public function newAdministratorAction(Request $request)
    {
        $form = $this->createForm(new NewAdministratorFormType());

        if ($request->isMethod('POST')) {
            $form->handleRequest($request);
            if ($form->isValid()) {
                $em = $this->getDoctrine()->getManager();
                /* @var $user User */
                $user = $form->getData();
                $user->setRegistrationDate(new \DateTime());
                $user->setEnabled(true);
                $user->addRole('ROLE_ADMIN');
                $em->persist($user);

                $permission = $user->getAdminPermission();
                $permission->setUser($user);

                $adminSettings = new AdminSettings();
                $adminSettings->setUser($user);
                $em->persist($adminSettings);

                $em->flush();

                $this->get('session')->getFlashBag()->add(
                    'success',
                    'Success!'
                );

                return $this->redirect($this->generateUrl('admin_home_new_administrator'));
            } else {
                $this->get('session')->getFlashBag()->add(
                    'error',
                    'Error!'
                );
            }
        }

        return array(
            'tab'   => 'general',
            'form'  => $form->createView()
        );
    }

    /**
     * @param Request $request
     * @param int     $id
     *
     * @return array
     *
     * @Route("/edit-administrator/{id}", name="admin_home_edit_administrator")
     * @Template("BuxAdminHomeBundle:ManageAdministrators:edit_administrator.html.twig")
     */
    public function editAdministratorAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $admin = $em->getRepository('BuxUserBundle:User')->find($id);
        if (!$admin) {
            throw new NotFoundHttpException('Not Found!');
        }

        if (!in_array('ROLE_ADMIN', $admin->getRoles())) {
            throw new NotFoundHttpException('Not Found!');
        }

        $form = $this->createForm(new EditAdministratorFormType(), $admin);

        if ($request->isMethod('POST')) {
            $form->handleRequest($request);
            if ($form->isValid()) {
                $em = $this->getDoctrine()->getManager();
                /* @var $user User */
                $user = $form->getData();

                /** @var $userManager \FOS\UserBundle\Model\UserManagerInterface */
                $userManager = $this->get('fos_user.user_manager');
                $userManager->updateUser($user);

                $this->get('session')->getFlashBag()->add(
                    'success',
                    'Success!'
                );

                return $this->redirect($this->generateUrl('admin_home_edit_administrator', array('id' => $id)));
            } else {
                $this->get('session')->getFlashBag()->add(
                    'error',
                    'Error!'
                );
            }
        }

        return array(
            'tab'   => 'general',
            'form'  => $form->createView()
        );
    }
}