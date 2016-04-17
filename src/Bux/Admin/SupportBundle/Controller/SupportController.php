<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/9/15
 * Time: 12:12 PM
 */

namespace Bux\Admin\SupportBundle\Controller;

use APY\DataGridBundle\Grid\Action\DeleteMassAction;
use APY\DataGridBundle\Grid\Action\MassAction;
use APY\DataGridBundle\Grid\Column\TextColumn;
use APY\DataGridBundle\Grid\Source\Entity;
use Bux\Admin\SupportBundle\Form\Type\ReplySupportTicketFormType;
use Bux\OfficeBundle\Entity\ReplySupportTicket;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class SupportController
 *
 * @package Bux\Admin\SupportBundle\Controller
 *
 * @Route("/support")
 */
class SupportController extends Controller
{
    /**
     * @return array
     *
     * @Route("/all-tickets", name="admin_support_all_tickets")
     */
    public function allTicketsAction()
    {
        $source     = new Entity('BuxOfficeBundle:SupportTicket');
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
//            'lastUpdate'
        ));

        $grid->getColumn('dateSubmitted')->setTitle('Date Submitted');
        $grid->getColumn('ticketNumber')->setTitle('Ticket ID');
        $grid->getColumn('subject')->setTitle('Subject');
        $lastUpdate = $grid->getColumn('lastUpdate')->setTitle('Last Update');

//        $lastUpdate->manipulateRenderCell(function($value, $row, $router) {
//            $date = new \DateTime();
//            $interval = $date->diff(\DateTime::createFromFormat('M d, Y, g:i:s a', $value));
//            if ($interval->format('%d') > 0) {
//                return $interval->format('%dd %hh %im %ss');
//            } else {
//                return $interval->format('%hh %im %ss');
//            }
//        });

        $membership = new TextColumn(array(
            'id'    => 'user',
            'field' => 'user.username',
            'title' => 'Submitter',
            'source'    => true,
        ));

        $grid->addColumn($membership, 5);

        $ticketNumber = $grid->getColumn('ticketNumber');

        $ticketNumber->manipulateRenderCell(function($value, $row, $router) {
            return array(
                $value => $router->generate('admin_support_reply_ticket', array('id' => $row->getField('id')))
            );
        });

        $massAction = new DeleteMassAction(true);
        $massAction->setConfirm('sdfsdfs');
        $grid->addMassAction($massAction);

        $massAction = new MassAction('Open', 'Bux\Admin\SupportBundle\Controller\SupportController::openTickets', true, array('em' => $this->getDoctrine()->getManager()), null);
        $grid->addMassAction($massAction);

        $massAction = new MassAction('Close', 'Bux\Admin\SupportBundle\Controller\SupportController::closeTickets', true, array('em' => $this->getDoctrine()->getManager()), null);
        $grid->addMassAction($massAction);

        return $grid->getGridResponse('BuxAdminSupportBundle::all_tickets.html.twig');
    }

    /**
     * @return array
     *
     * @Route("/open-tickets", name="admin_support_open_tickets")
     */
    public function openTicketsAction()
    {
        $source     = new Entity('BuxOfficeBundle:SupportTicket');
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
            'text'
        ));

        $grid->getColumn('dateSubmitted')->setTitle('Date Submitted');
        $grid->getColumn('ticketNumber')->setTitle('Ticket ID');
        $grid->getColumn('subject')->setTitle('Subject');
        $lastUpdate = $grid->getColumn('lastUpdate')->setTitle('Last Update');

//        $lastUpdate->manipulateRenderCell(function($value, $row, $router) {
//            $date = new \DateTime();
//            $interval = $date->diff(\DateTime::createFromFormat('M d, Y, g:i:s a', $value));
//            if ($interval->format('%d') > 0) {
//                return $interval->format('%dd %hh %im %ss');
//            } else {
//                return $interval->format('%hh %im %ss');
//            }
//        });

        $grid->setPermanentFilters(array(
            'status' => '0',
        ));

        $membership = new TextColumn(array(
            'id'    => 'user',
            'field' => 'user.username',
            'title' => 'Submitter',
            'source'    => true,
        ));

        $grid->addColumn($membership, 5);

        $ticketNumber = $grid->getColumn('ticketNumber');

        $ticketNumber->manipulateRenderCell(function($value, $row, $router) {
            return array(
                $value => $router->generate('admin_support_reply_ticket', array('id' => $row->getField('id')))
            );
        });

        $massAction = new DeleteMassAction(true);
        $massAction->setConfirm('sdfsdfs');
        $grid->addMassAction($massAction);

        $massAction = new MassAction('Open', 'Bux\Admin\SupportBundle\Controller\SupportController::openTickets', true, array('em' => $this->getDoctrine()->getManager()), null);
        $grid->addMassAction($massAction);

        $massAction = new MassAction('Close', 'Bux\Admin\SupportBundle\Controller\SupportController::closeTickets', true, array('em' => $this->getDoctrine()->getManager()), null);
        $grid->addMassAction($massAction);

        return $grid->getGridResponse('BuxAdminSupportBundle::open_tickets.html.twig');
    }

    /**
     * @return array
     *
     * @Route("/answered-tickets", name="admin_support_answered_tickets")
     */
    public function answeredTicketsAction()
    {
        $source     = new Entity('BuxOfficeBundle:SupportTicket');
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
            'text'
        ));

        $grid->getColumn('dateSubmitted')->setTitle('Date Submitted');
        $grid->getColumn('ticketNumber')->setTitle('Ticket ID');
        $grid->getColumn('subject')->setTitle('Subject');
        $lastUpdate = $grid->getColumn('lastUpdate')->setTitle('Last Update');

//        $lastUpdate->manipulateRenderCell(function($value, $row, $router) {
//            $date = new \DateTime();
//            $interval = $date->diff(\DateTime::createFromFormat('M d, Y, g:i:s a', $value));
//            if ($interval->format('%d') > 0) {
//                return $interval->format('%dd %hh %im %ss');
//            } else {
//                return $interval->format('%hh %im %ss');
//            }
//        });

        $grid->setPermanentFilters(array(
            'status' => '1',
        ));

        $membership = new TextColumn(array(
            'id'    => 'user',
            'field' => 'user.username',
            'title' => 'Submitter',
            'source'    => true,
        ));

        $grid->addColumn($membership, 5);

        $ticketNumber = $grid->getColumn('ticketNumber');

        $ticketNumber->manipulateRenderCell(function($value, $row, $router) {
            return array(
                $value => $router->generate('admin_support_reply_ticket', array('id' => $row->getField('id')))
            );
        });

        $massAction = new DeleteMassAction(true);
        $massAction->setConfirm('sdfsdfs');
        $grid->addMassAction($massAction);

        $massAction = new MassAction('Open', 'Bux\Admin\SupportBundle\Controller\SupportController::openTickets', true, array('em' => $this->getDoctrine()->getManager()), null);
        $grid->addMassAction($massAction);

        $massAction = new MassAction('Close', 'Bux\Admin\SupportBundle\Controller\SupportController::closeTickets', true, array('em' => $this->getDoctrine()->getManager()), null);
        $grid->addMassAction($massAction);

        return $grid->getGridResponse('BuxAdminSupportBundle::answered_tickets.html.twig');
    }

    /**
     * @return array
     *
     * @Route("/awaiting-tickets", name="admin_support_awaiting_tickets")
     */
    public function awaitingTicketsAction()
    {
        $source     = new Entity('BuxOfficeBundle:SupportTicket');
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
            'text'
        ));

        $grid->getColumn('dateSubmitted')->setTitle('Date Submitted');
        $grid->getColumn('ticketNumber')->setTitle('Ticket ID');
        $grid->getColumn('subject')->setTitle('Subject');
        $lastUpdate = $grid->getColumn('lastUpdate')->setTitle('Last Update');

//        $lastUpdate->manipulateRenderCell(function($value, $row, $router) {
//            $date = new \DateTime();
//            $interval = $date->diff(\DateTime::createFromFormat('M d, Y, g:i:s a', $value));
//            if ($interval->format('%d') > 0) {
//                return $interval->format('%dd %hh %im %ss');
//            } else {
//                return $interval->format('%hh %im %ss');
//            }
//        });

        $grid->setPermanentFilters(array(
            'status' => '2',
        ));

        $membership = new TextColumn(array(
            'id'    => 'user',
            'field' => 'user.username',
            'title' => 'Submitter',
            'source'    => true,
        ));

        $grid->addColumn($membership, 5);

        $ticketNumber = $grid->getColumn('ticketNumber');

        $ticketNumber->manipulateRenderCell(function($value, $row, $router) {
            return array(
                $value => $router->generate('admin_support_reply_ticket', array('id' => $row->getField('id')))
            );
        });

        $massAction = new DeleteMassAction(true);
        $massAction->setConfirm('sdfsdfs');
        $grid->addMassAction($massAction);

        $massAction = new MassAction('Open', 'Bux\Admin\SupportBundle\Controller\SupportController::openTickets', true, array('em' => $this->getDoctrine()->getManager()), null);
        $grid->addMassAction($massAction);

        $massAction = new MassAction('Close', 'Bux\Admin\SupportBundle\Controller\SupportController::closeTickets', true, array('em' => $this->getDoctrine()->getManager()), null);
        $grid->addMassAction($massAction);

        return $grid->getGridResponse('BuxAdminSupportBundle::awaiting_tickets.html.twig');
    }

    /**
     * @return array
     *
     * @Route("/closed-tickets", name="admin_support_closed_tickets")
     */
    public function closedTicketsAction()
    {
        $source     = new Entity('BuxOfficeBundle:SupportTicket');
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
            'text'
        ));

        $grid->getColumn('dateSubmitted')->setTitle('Date Submitted');
        $grid->getColumn('ticketNumber')->setTitle('Ticket ID');
        $grid->getColumn('subject')->setTitle('Subject');
        $lastUpdate = $grid->getColumn('lastUpdate')->setTitle('Last Update');

//        $lastUpdate->manipulateRenderCell(function($value, $row, $router) {
//            $date = new \DateTime();
//            $interval = $date->diff(\DateTime::createFromFormat('M d, Y, g:i:s a', $value));
//            if ($interval->format('%d') > 0) {
//                return $interval->format('%dd %hh %im %ss');
//            } else {
//                return $interval->format('%hh %im %ss');
//            }
//        });

        $grid->setPermanentFilters(array(
            'status' => '3',
        ));

        $membership = new TextColumn(array(
            'id'    => 'user',
            'field' => 'user.username',
            'title' => 'Submitter',
            'source'    => true,
        ));

        $grid->addColumn($membership, 5);

        $ticketNumber = $grid->getColumn('ticketNumber');

        $ticketNumber->manipulateRenderCell(function($value, $row, $router) {
            return array(
                $value => $router->generate('admin_support_reply_ticket', array('id' => $row->getField('id')))
            );
        });

        $massAction = new DeleteMassAction(true);
        $massAction->setConfirm('sdfsdfs');
        $grid->addMassAction($massAction);

        $massAction = new MassAction('Open', 'Bux\Admin\SupportBundle\Controller\SupportController::openTickets', true, array('em' => $this->getDoctrine()->getManager()), null);
        $grid->addMassAction($massAction);

        $massAction = new MassAction('Close', 'Bux\Admin\SupportBundle\Controller\SupportController::closeTickets', true, array('em' => $this->getDoctrine()->getManager()), null);
        $grid->addMassAction($massAction);

        return $grid->getGridResponse('BuxAdminSupportBundle::closed_tickets.html.twig');
    }

    /**
     * @param array  $primaryKeys
     * @param array  $allPrimaryKeys
     * @param string $session
     * @param array  $parameters
     */
    static public function openTickets($primaryKeys, $allPrimaryKeys, $session, $parameters)
    {
        /* @var $em EntityManager */
        $em = $parameters['em'];

        foreach ($primaryKeys as $ticketId) {
            /* @var $statistic \Bux\OfficeBundle\Entity\SupportTicket */
            $ticket = $em->getRepository('BuxOfficeBundle:SupportTicket')->find($ticketId);
            $ticket->setStatus(0);
            $em->flush();
        }
    }

    /**
     * @param array  $primaryKeys
     * @param array  $allPrimaryKeys
     * @param string $session
     * @param array  $parameters
     */
    static public function closeTickets($primaryKeys, $allPrimaryKeys, $session, $parameters)
    {
        /* @var $em EntityManager */
        $em = $parameters['em'];

        foreach ($primaryKeys as $ticketId) {
            /* @var $statistic \Bux\OfficeBundle\Entity\SupportTicket */
            $ticket = $em->getRepository('BuxOfficeBundle:SupportTicket')->find($ticketId);
            $ticket->setStatus(3);
            $em->flush();
        }
    }

    /**
     * @param Request $request
     * @param int     $id
     *
     * @return array
     *
     * @Route("/reply-ticket/{id}", name="admin_support_reply_ticket")
     * @Template("BuxAdminSupportBundle::reply_ticket.html.twig")
     */
    public function replyTicketAction(Request $request, $id)
    {
        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();
        $ticket = $em->getRepository('BuxOfficeBundle:SupportTicket')->find($id);
        $qb = $em->getRepository('BuxOfficeBundle:ReplySupportTicket')->createQueryBuilder('rt');
        $qb
            ->where('rt.supportTicket = :ticket')
            ->setParameter('ticket', $ticket)
            ->orderBy('rt.id', 'ASC');
        $replyTicket = $qb->getQuery()->getResult();

        $form = $this->createForm(new ReplySupportTicketFormType());

        if ($request->isMethod('POST')) {
            $form->handleRequest($request);
            if ($form->isValid()) {
                /* @var $reply ReplySupportTicket */
                $reply = $form->getData();
                $reply->setUser($this->getUser());
                $date = new \DateTime();
                $reply->setDate($date);
                $reply->setSupportTicket($ticket);
                $ticket->setLastUpdate($date);
                if ($form->get('closed')->getData()) {
                    $ticket->setStatus(3);
                } else {
                    $ticket->setStatus(1);
                }

                $em->persist($reply);
                $em->flush();

                $text = $reply->getText();
                $text .= "\r\n" . "\r\n" . 'Best regards,';
                $text .= "\r\n" . "\r\n" . 'Ticket Details';
                $text .= "\r\n" . '---------------';
                $text .= "\r\n" . "\r\n" . 'Ticket ID:' . $ticket->getTicketNumber();
//                $text .= "\r\n" . 'Department:';
                $text .= "\r\n" . 'Status: Answered';
                $message = \Swift_Message::newInstance()
                    ->setSubject('Answered')
                    ->setFrom(array('support@ojooad.com' => 'OJOOAD support'))
                    ->setTo($ticket->getUser()->getEmail())
                    ->setBody($text);

                $this->container->get('mailer')->send($message);

                $this->get('session')->getFlashBag()->add(
                    'success',
                    'Success!'
                );

                return $this->redirect($this->generateUrl('admin_support_reply_ticket', array('id'  => $id)));
            }
        }

        return array(
            'ticket'        => $ticket,
            'reply_ticket'  => $replyTicket,
            'form'          => $form->createView()
        );
    }
}