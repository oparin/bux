<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/12/15
 * Time: 10:25 AM
 */

namespace Bux\UserBundle\EventListener;

use Doctrine\ORM\EntityManager;
use Symfony\Component\DependencyInjection\Container;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;

/**
 * Class ReferralListener
 *
 * @package Bux\UserBundle\EventListener
 */
class ReferralListener implements EventSubscriberInterface
{
    /**
     * @param EntityManager $em
     * @param Container     $container
     * @param Session       $session
     */
    public function __construct(EntityManager $em, Container $container, Session $session)
    {
        $this->em           = $em;
        $this->container    = $container;
        $this->session      = $session;
    }

    /**
     * @param GetResponseEvent $event
     */
    public function onKernelRequest(GetResponseEvent $event)
    {
        $request = $event->getRequest();
        if ($request->get('ref')) {
            if ($request->get('ref') != 'admin') {
                $this->session->set('referral', $request->get('ref'));
            }
        }
    }

    /**
     * @return array
     */
    public static function getSubscribedEvents()
    {
        return array(
            KernelEvents::REQUEST => array(array('onKernelRequest', 1)),
        );
    }
}