<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 12/24/14
 * Time: 4:19 PM
 */

namespace Bux\Admin\HomeBundle\EventListener;

use Bux\Admin\HomeBundle\Entity\LoginLog;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Routing\Router;
use Symfony\Component\Security\Core\AuthenticationEvents;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Event\AuthenticationEvent;
use Symfony\Component\Security\Core\Event\AuthenticationFailureEvent;

/**
 * Class AuthenticationListener
 *
 * @package Bux\Admin\HomeBundle\EventListener
 */
class AuthenticationListener implements EventSubscriberInterface
{
    protected $em;
    protected $router;

    /**
     * @param EntityManager $em
     * @param Router        $router
     */
    public function __construct(EntityManager $em, Router $router)
    {
        $this->em = $em;
        $this->router = $router;
    }

    /**
     * getSubscribedEvents
     * @return     array
     */
    public static function getSubscribedEvents()
    {
        return array(
            AuthenticationEvents::AUTHENTICATION_FAILURE => 'onAuthenticationFailure',
            AuthenticationEvents::AUTHENTICATION_SUCCESS => 'onAuthenticationSuccess',
        );
    }

    /**
     * onAuthenticationFailure
     *
     * @param AuthenticationFailureEvent $event
     */
    public function onAuthenticationFailure(AuthenticationFailureEvent $event)
    {
        if ($this->router->getContext()->getPathInfo() == '/admin/login_check') {
            $loginLog = new LoginLog();
            $loginLog->setLogin($event->getAuthenticationToken()->getUser());
            $loginLog->setDate(new \DateTime());

            /* @var $request \Symfony\Component\HttpFoundation\Request */
            $loginLog->setIpAddress($_SERVER['REMOTE_ADDR']);
            $loginLog->setUserAgent($_SERVER['HTTP_USER_AGENT']);
            $loginLog->setStatus(false);
            $this->em->persist($loginLog);
            $this->em->flush();
        }
    }

    /**
     * onAuthenticationSuccess
     *
     * @param AuthenticationEvent $event
     */
    public function onAuthenticationSuccess(AuthenticationEvent $event)
    {
        /* @var $user \Bux\UserBundle\Entity\User */
        $user = $event->getAuthenticationToken()->getUser();
        if ($user) {
            if (in_array('ROLE_ADMIN', $user->getRoles())) {
                $loginLog = new LoginLog();
                $loginLog->setLogin($user->getUsername());
                $loginLog->setDate(new \DateTime());

                /* @var $request \Symfony\Component\HttpFoundation\Request */
                $loginLog->setIpAddress($_SERVER['REMOTE_ADDR']);
                $loginLog->setUserAgent($_SERVER['HTTP_USER_AGENT']);
                $loginLog->setStatus(true);
                $this->em->persist($loginLog);
                $this->em->flush();
            }
        }
    }
}