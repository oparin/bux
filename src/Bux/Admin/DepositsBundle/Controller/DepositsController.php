<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/7/15
 * Time: 2:51 PM
 */

namespace Bux\Admin\DepositsBundle\Controller;

use APY\DataGridBundle\Grid\Action\DeleteMassAction;
use APY\DataGridBundle\Grid\Column\TextColumn;
use APY\DataGridBundle\Grid\Source\Entity;
use Bux\Admin\DepositsBundle\Form\Type\AddManualDepositFormType;
use Bux\StatisticBundle\Entity\DepositStatistic;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class DepositsController
 *
 * @package Bux\Admin\DepositsBundle\Controller
 *
 * @Route("/deposits")
 */
class DepositsController extends Controller
{
    /**
     * @return array
     *
     * @Route("/view-deposits", name="admin_deposits_view_deposits")
     */
    public function indexAction()
    {
        $source     = new Entity('BuxStatisticBundle:DepositStatistic');
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
            'id'
        ));

        $grid->getColumn('date')->setTitle('Date');
        $grid->getColumn('amount')->setTitle('Amount');
        $grid->getColumn('account')->setTitle('Account');
        $grid->getColumn('paymentID')->setTitle('Payment ID');

        $membership = new TextColumn(array(
            'id'    => 'user',
            'field' => 'user.username',
            'title' => 'Member',
            'source'    => true
        ));

        $grid->addColumn($membership, 3);

        $membership = new TextColumn(array(
            'id'    => 'paymentMethod',
            'field' => 'paymentMethod.name',
            'title' => 'Method',
            'source'    => true
        ));

        $grid->addColumn($membership, 5);

        $massAction = new DeleteMassAction(true);
        $massAction->setConfirm('sdfsdfs');
        $grid->addMassAction($massAction);

        return $grid->getGridResponse('BuxAdminDepositsBundle::view_deposits.html.twig');
    }

    /**
     * @param Request $request
     *
     * @return array
     *
     * @Route("/add-manual-deposit", name="admin_deposits_add_manual_deposit")
     * @Template("BuxAdminDepositsBundle::add_manual_deposit.html.twig")
     */
    public function addManualDepositAction(Request $request)
    {
        $form = $this->createForm(new AddManualDepositFormType(), null);

        if ($request->isMethod('POST')) {
            $form->handleRequest($request);
            if ($form->isValid()) {
                $username = $form->get('username')->getData();
                $em = $this->getDoctrine()->getManager();
                $user = $em->getRepository('BuxUserBundle:User')->findOneBy(array(
                    'username'  => $username
                ));

                if (!$user) {
                    $form->get('username')->addError(new FormError('Username does not exist'));
                    $this->get('session')->getFlashBag()->add(
                        'error',
                        'Success!'
                    );
                } else {
                    if ($form->get('purchaseBalance')->getData()) {
                        $wallet = $user->getPurchaseWallet();
                        $wallet->setSum($wallet->getSum() + $form->get('amount')->getData());
                    } else {
                        $wallet = $user->getWallet();
                        $wallet->setSum($wallet->getSum() + $form->get('amount')->getData());
                    }

                    // Save Deposit Statistic
                    $depositStatistic = new DepositStatistic();
                    $depositStatistic->setDate(new \DateTime());
                    $depositStatistic->setUser($user);
                    $depositStatistic->setAmount($form->get('amount')->getData());
                    $depositStatistic->setPaymentMethod($form->get('method')->getData());
                    $depositStatistic->setAccount($form->get('fromAccount')->getData());
                    $depositStatistic->setPaymentID($form->get('transactionID')->getData());
                    $em->persist($depositStatistic);
                    $em->flush();

                    $this->get('session')->getFlashBag()->add(
                        'success',
                        'Success!'
                    );

                    return $this->redirect($this->generateUrl('admin_deposits_add_manual_deposit'));
                }
            } else {
                $this->get('session')->getFlashBag()->add(
                    'error',
                    'Success!'
                );
            }
        }

        return array(
            'form'  => $form->createView(),
        );
    }
}