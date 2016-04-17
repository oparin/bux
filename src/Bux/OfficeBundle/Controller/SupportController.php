<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/8/15
 * Time: 4:28 PM
 */

namespace Bux\OfficeBundle\Controller;

use Bux\OfficeBundle\Entity\ReplySupportTicket;
use Bux\OfficeBundle\Entity\SupportTicket;
use Bux\OfficeBundle\Form\Type\NewSupportTicketFormType;
use Bux\OfficeBundle\Form\Type\ReplySupportTicketFormType;
use Bux\OfficeBundle\Form\Type\TicketIdFormType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class SupportController
 *
 * @package Bux\OfficeBundle\Controller
 *
 * @Route("/support")
 */
class SupportController extends Controller
{
    /**
     * @param Request $request
     *
     * @return array
     *
     * @Route("/", name="office_support")
     * @Template("BuxOfficeBundle:Support:index.html.twig")
     */
    public function indexAction(Request $request)
    {
        $form = $this->createForm(new TicketIdFormType());

        if ($request->isMethod('POST')) {
            $form->handleRequest($request);
            if ($form->isValid()) {
                $em = $this->getDoctrine()->getManager();
                $ticket = $em->getRepository('BuxOfficeBundle:SupportTicket')->findOneBy(array(
                    'ticketNumber'  => $form->get('ticketId')->getData()
                ));
                if (!$ticket) {
                    $this->get('session')->getFlashBag()->add(
                        'error',
                        $this->get('translator')->trans('frontend.support.form.ticket_not_found')
                    );
                } else {
                    return $this->redirect($this->generateUrl('office_support_view_ticket', array('id'  => $ticket->getId())));
                }
            }
        }

        return array(
            'form'  => $form->createView()
        );
    }

    /**
     * @param Request $request
     * @param int     $id
     *
     * @return array
     *
     * @Route("/view-ticket/{id}", name="office_support_view_ticket")
     * @Template("BuxOfficeBundle:Support:view_ticket.html.twig")
     */
    public function viewTicketAction(Request $request, $id)
    {
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
                $ticket->setStatus(2);

                $em->persist($reply);
                $em->flush();

                $text = 'Dear ' . $reply->getUser()->getUsername();
                $text .= "\r\n" . "\r\n" . 'Your reply to support request has been noted';
                $text .= "\r\n" . "\r\n" . 'Regards,';
                $text .= "\r\n" . "\r\n" . 'Ticket Details';
                $text .= "\r\n" . '---------------';
                $text .= "\r\n" . "\r\n" . 'Ticket ID: ' . $ticket->getTicketNumber();
                $text .= "\r\n" . 'Status: Awaiting Reply';
                $message = \Swift_Message::newInstance()
                    ->setSubject('Ticket replied')
                    ->setFrom(array('support@ojooad.com' => 'OJOOAD support'))
                    ->setTo($ticket->getUser()->getEmail())
                    ->setBody($text);

                $this->container->get('mailer')->send($message);

                $this->get('session')->getFlashBag()->add(
                    'success',
                    'Success!'
                );

                return $this->redirect($this->generateUrl('office_support_view_ticket', array('id'  => $id)));
            } else {
                dump(111);exit;
            }
        }

        return array(
            'ticket'        => $ticket,
            'reply_ticket'  => $replyTicket,
            'form'          => $form->createView()
        );
    }

    /**
     * @param Request $request
     *
     * @return array
     *
     * @Route("/new-ticket", name="office_support_new_ticket")
     * @Template("BuxOfficeBundle:Support:new_ticket.html.twig")
     */
    public function newTicketAction(Request $request)
    {
        $form = $this->createForm(new NewSupportTicketFormType());

        if ($request->isMethod('POST')) {
            $form->handleRequest($request);
            if ($form->isValid()) {
                /* @var $supportTicket SupportTicket */
                $supportTicket = $form->getData();
                $date = new \DateTime();
                $supportTicket->setDateSubmitted($date);
                $supportTicket->setLastUpdate($date);
                $supportTicket->setTicketNumber(substr(md5(time()), 0, 12));
                $supportTicket->setUser($this->getUser());

                $em = $this->getDoctrine()->getManager();
                $em->persist($supportTicket);
                $em->flush();

//                $text = 'Dear ' . $supportTicket->getUser()->getUsername();
//                $text .= "\r\n" . "\r\n" . 'Thank you for contacting us. This is an automated response confirming the receipt of your ticket. One of our agents will get back to you as soon as possible. For your records, the details of the ticket are listed below. When replying, please make sure that the ticket ID is kept in the subject line to ensure that your replies are tracked appropriately.';
//                $text .= "\r\n" . "\r\n" . 'Ticket ID:' . $supportTicket->getTicketNumber();
//                $text .= "\r\n" . 'Subject:' . $supportTicket->getSubject();
//                $text .= "\r\n" . 'Status: Open';
//                $text .= "\r\n" . "\r\n" . 'Regards,';
//                $text .= "\r\n" . "\r\n" . 'You can check the status of or reply to this ticket online at: ';
//                $text .= "\r\n" . '<a href="' . $this->generateUrl('office_support') . '">' . $this->generateUrl('office_support') . '</a>';
                $message = \Swift_Message::newInstance()
                    ->setSubject('New ticket')
                    ->setFrom(array('support@ojooad.com' => 'OJOOAD support'))
                    ->setTo($this->getUser()->getEmail())
//                    ->setBody($text);
                    ->setBody(
                        $this->renderView(
                            'Emails/new_ticket.html.twig',
                            array(
                                'link' => $this->generateUrl('office_support'),
                                'user' => $supportTicket->getUser()->getUsername(),
                                'ticket'    => $supportTicket->getTicketNumber(),
                                'subject'    => $supportTicket->getSubject()
                            )
                        ),
                        'text/html'
                    );

                $this->container->get('mailer')->send($message);

                $this->get('session')->getFlashBag()->add(
                    'success',
                    $this->get('translator')->trans('frontend.support.form.success_text') . ' ' . $supportTicket->getTicketNumber()
                );

                return $this->redirect($this->generateUrl('office_support_new_ticket'));
            }
        }

        return array(
            'form'  => $form->createView()
        );
    }
}