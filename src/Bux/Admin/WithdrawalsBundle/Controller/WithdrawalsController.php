<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/8/15
 * Time: 12:35 PM
 */

namespace Bux\Admin\WithdrawalsBundle\Controller;

use APY\DataGridBundle\Grid\Action\DeleteMassAction;
use APY\DataGridBundle\Grid\Action\MassAction;
use APY\DataGridBundle\Grid\Column\TextColumn;
use APY\DataGridBundle\Grid\Column\UntypedColumn;
use APY\DataGridBundle\Grid\Source\Entity;
use Bux\Admin\WithdrawalsBundle\Grid\Column\WithdrawStatusColumn;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

/**
 * Class WithdrawalsController
 *
 * @package Bux\Admin\WithdrawalsBundle\Controller
 *
 * @Route("/withdrawals")
 */
class WithdrawalsController extends Controller
{
    /**
     * @return array
     *
     * @Route("/all-withdrawals", name="admin_withdrawals_all_withdrawals")
     */
    public function allWithdrawalsAction()
    {
        $source     = new Entity('BuxStatisticBundle:WithdrawStatistic');
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
            'amount'
        ));

        $grid->getColumn('date')->setTitle('Date');
        $grid->getColumn('amount')->setTitle('Amount');
        $grid->getColumn('account')->setTitle('Account');

        $membership = new TextColumn(array(
            'id'    => 'user',
            'field' => 'user.username',
            'title' => 'Member',
            'source'    => true,
        ));

        $grid->addColumn($membership, 3);

        $membership = new TextColumn(array(
            'id'    => 'paymentMethod',
            'field' => 'paymentMethod.name',
            'title' => 'Method',
            'source'    => true
        ));

        $grid->addColumn($membership, 5);

        $amount = new TextColumn(array(
            'id'    => 'amount',
            'title' => 'Amount'
        ));
        $grid->addColumn($amount, 6);


        $massAction = new DeleteMassAction(true);
        $massAction->setConfirm('sdfsdfs');
        $grid->addMassAction($massAction);

        $massAction = new MassAction('Set as Completed', 'Bux\Admin\WithdrawalsBundle\Controller\WithdrawalsController::withdrawCompleted', true, array('em' => $this->getDoctrine()->getManager()), null);
        $grid->addMassAction($massAction);

        $massAction = new MassAction('Set as Canceled', 'Bux\Admin\WithdrawalsBundle\Controller\WithdrawalsController::withdrawCanceled', true, array('em' => $this->getDoctrine()->getManager()), null);
        $grid->addMassAction($massAction);

        $massAction = new MassAction('Refund', 'Bux\Admin\WithdrawalsBundle\Controller\WithdrawalsController::withdrawRefund', true, array('em' => $this->getDoctrine()->getManager()), null);
        $grid->addMassAction($massAction);

        return $grid->getGridResponse('BuxAdminWithdrawalsBundle::all_withdrawals.html.twig');
    }

    /**
     * @return array
     *
     * @Route("/pending-withdrawal", name="admin_withdrawals_pending_withdrawal")
     */
    public function pendingWithdrawalsAction()
    {
        $source     = new Entity('BuxStatisticBundle:WithdrawStatistic');
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
        ));

        $grid->getColumn('date')->setTitle('Date');
        $grid->getColumn('amount')->setTitle('Amount');
        $grid->getColumn('account')->setTitle('Account');
        $grid->setPermanentFilters(array(
            'status' => '0',
        ));

        $membership = new TextColumn(array(
            'id'    => 'user',
            'field' => 'user.username',
            'title' => 'Member',
            'source'    => true,
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

        return $grid->getGridResponse('BuxAdminWithdrawalsBundle::pending_withdrawal.html.twig');
    }

    /**
     * @return array
     *
     * @Route("/completed-withdrawal", name="admin_withdrawals_completed_withdrawal")
     */
    public function completedWithdrawalsAction()
    {
        $source     = new Entity('BuxStatisticBundle:WithdrawStatistic');
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
        ));

        $grid->getColumn('date')->setTitle('Date');
        $grid->getColumn('amount')->setTitle('Amount');
        $grid->getColumn('account')->setTitle('Account');
        $grid->setPermanentFilters(array(
            'status' => '1',
        ));

        $membership = new TextColumn(array(
            'id'    => 'user',
            'field' => 'user.username',
            'title' => 'Member',
            'source'    => true,
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

        return $grid->getGridResponse('BuxAdminWithdrawalsBundle::completed_withdrawal.html.twig');
    }

    /**
     * @return array
     *
     * @Route("/canceled-withdrawal", name="admin_withdrawals_canceled_withdrawal")
     */
    public function canceledWithdrawalsAction()
    {
        $source     = new Entity('BuxStatisticBundle:WithdrawStatistic');
        $grid       = $this->get('grid');
        $tableAlias = $source->getTableAlias();

        $source->manipulateQuery(
            function ($query) use ($tableAlias)
            {
                /* @var $query \Doctrine\ORM\QueryBuilder */
                $query
                    ->andWhere($tableAlias . '.status = 2')
                    ->orderBy($tableAlias . '.id', 'DESC');
            }
        );
        $grid->setSource($source);

        $grid->hideColumns(array(
            'id',
        ));

        $grid->getColumn('date')->setTitle('Date');
        $grid->getColumn('amount')->setTitle('Amount');
        $grid->getColumn('account')->setTitle('Account');
        $grid->setPermanentFilters(array(
            'status' => '2',
        ));

        $membership = new TextColumn(array(
            'id'    => 'user',
            'field' => 'user.username',
            'title' => 'Member',
            'source'    => true,
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

        return $grid->getGridResponse('BuxAdminWithdrawalsBundle::canceled_withdrawal.html.twig');
    }

    /**
     * @param array  $primaryKeys
     * @param array  $allPrimaryKeys
     * @param string $session
     * @param array  $parameters
     */
    static public function withdrawCompleted($primaryKeys, $allPrimaryKeys, $session, $parameters)
    {
        /* @var $em EntityManager */
        $em = $parameters['em'];

        foreach ($primaryKeys as $statisticId) {
            /* @var $statistic \Bux\StatisticBundle\Entity\WithdrawStatistic */
            $statistic = $em->getRepository('BuxStatisticBundle:WithdrawStatistic')->find($statisticId);
//            $walet = $statistic->getUser()->getWallet();
//            $walet->setSum($walet->getSum() - $statistic->getAmount());
            $statistic->setStatus(1);
            $em->flush();
        }
    }

    /**
     * @param array  $primaryKeys
     * @param array  $allPrimaryKeys
     * @param string $session
     * @param array  $parameters
     */
    static public function withdrawCanceled($primaryKeys, $allPrimaryKeys, $session, $parameters)
    {
        /* @var $em EntityManager */
        $em = $parameters['em'];

        foreach ($primaryKeys as $statisticId) {
            /* @var $statistic \Bux\StatisticBundle\Entity\WithdrawStatistic */
            $statistic = $em->getRepository('BuxStatisticBundle:WithdrawStatistic')->find($statisticId);
            $walet = $statistic->getUser()->getWallet();
            $walet->setSum($walet->getSum() - $statistic->getAmount());
            $statistic->setStatus(2);
            $em->flush();
        }
    }

    /**
     * @param array  $primaryKeys
     * @param array  $allPrimaryKeys
     * @param string $session
     * @param array  $parameters
     */
    static public function withdrawRefund($primaryKeys, $allPrimaryKeys, $session, $parameters)
    {
        /* @var $em EntityManager */
        $em = $parameters['em'];

        foreach ($primaryKeys as $statisticId) {
            /* @var $statistic \Bux\StatisticBundle\Entity\WithdrawStatistic */
            $statistic = $em->getRepository('BuxStatisticBundle:WithdrawStatistic')->find($statisticId);
            $walet = $statistic->getUser()->getWallet();
            $walet->setSum($walet->getSum() + $statistic->getAmount());
            $statistic->setStatus(3);
            $em->flush();
        }
    }
}