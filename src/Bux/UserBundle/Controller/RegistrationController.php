<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 12/23/14
 * Time: 12:31 PM
 */

namespace Bux\UserBundle\Controller;

use Bux\AdvertiseBundle\Entity\AutoSerfCredits;
use Bux\AdvertiseBundle\Entity\BannerCredits;
use Bux\AdvertiseBundle\Entity\BigBannerCredits;
use Bux\AdvertiseBundle\Entity\PollCredits;
use Bux\AdvertiseBundle\Entity\VideoCredits;
use Bux\BlogBundle\Entity\BlogUserSettings;
use Bux\UserBundle\Entity\User;
use Bux\WalletBundle\Entity\PurchaseWallet;
use Bux\WalletBundle\Entity\SurveyWalletAvailableBalance;
use Bux\WalletBundle\Entity\SurveyWalletBalance;
use Bux\WalletBundle\Entity\UserPaymentAccount;
use Bux\WalletBundle\Entity\Wallet;
use FOS\UserBundle\FOSUserEvents;
use FOS\UserBundle\Event\FormEvent;
use FOS\UserBundle\Event\GetResponseUserEvent;
use FOS\UserBundle\Event\FilterUserResponseEvent;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use FOS\UserBundle\Model\UserInterface;

/**
 * Class RegistrationController
 *
 * @package Bux\UserBundle\Controller
 */
class RegistrationController extends Controller
{
    /**
     * @param Request $request
     *
     * @return null|RedirectResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function registerAction(Request $request)
    {
        /** @var $formFactory \FOS\UserBundle\Form\Factory\FactoryInterface */
        $formFactory = $this->get('fos_user.registration.form.factory');
        /** @var $userManager \FOS\UserBundle\Model\UserManagerInterface */
        $userManager = $this->get('fos_user.user_manager');
        /** @var $dispatcher \Symfony\Component\EventDispatcher\EventDispatcherInterface */
        $dispatcher = $this->get('event_dispatcher');

        /* @var $user User */
        $user = $userManager->createUser();
        $user->setEnabled(true);

        $event = new GetResponseUserEvent($user, $request);
        $dispatcher->dispatch(FOSUserEvents::REGISTRATION_INITIALIZE, $event);

        if (null !== $event->getResponse()) {
            return $event->getResponse();
        }

        /* @var $em \Doctrine\ORM\EntityManager */
        $em = $this->container->get('doctrine')->getManager();

        $page = $em->getRepository('BuxAdminSetupBundle:StaticPage')->findOneBy(array(
            'name'  => 'terms'
        ));

        $form = $formFactory->createForm();
        $form->setData($user);

        $form->handleRequest($request);

        if ($form->isValid()) {
            $captcha        = $form->get('captcha')->getData();
            $captchaAnswer  = $form->get('captchaAnswer')->getData();
            if ($captcha != $captchaAnswer) {
                $form->get('captcha')->addError(new FormError('Value Is not valid!'));
            } else {
                $user->addRole('ROLE_USER');
                $this->createWallet($user);
                $this->createPaymentAccount($user);
                $user->setRegistrationDate(new \DateTime());

                $user->setSponsor($this->getSponsor());

                $user->setMembership($this->getFreeMembership());
                $this->setCredits($user);
                $blogSettings = new BlogUserSettings();
                $blogSettings->setUpdatedAt(new \DateTime());
                $blogSettings->setUser($user);
                $em->persist($blogSettings);

                $event = new FormEvent($form, $request);
                $dispatcher->dispatch(FOSUserEvents::REGISTRATION_SUCCESS, $event);

                $userManager->updateUser($user);

                if (null === $response = $event->getResponse()) {
                    $url = $this->generateUrl('fos_user_registration_confirmed');
                    $response = new RedirectResponse($url);
                }

                $dispatcher->dispatch(FOSUserEvents::REGISTRATION_COMPLETED,
                    new FilterUserResponseEvent($user, $request, $response));

                return $response;
            }
        }

        return $this->render('FOSUserBundle:Registration:register.html.twig', array(
            'form' => $form->createView(),
            'page'  => $page->getContent()
        ));
    }

    /**
     * Receive the confirmation token from user email provider, login the user
     */
    public function confirmAction(Request $request, $token)
    {
        /** @var $userManager \FOS\UserBundle\Model\UserManagerInterface */
        $userManager = $this->get('fos_user.user_manager');

        $user = $userManager->findUserByConfirmationToken($token);

        if (null === $user) {
            throw new NotFoundHttpException(sprintf('The user with confirmation token "%s" does not exist', $token));
        }

        /** @var $dispatcher \Symfony\Component\EventDispatcher\EventDispatcherInterface */
        $dispatcher = $this->get('event_dispatcher');

        $user->setConfirmationToken(null);
        $user->setEnabled(true);

        $event = new GetResponseUserEvent($user, $request);
        $dispatcher->dispatch(FOSUserEvents::REGISTRATION_CONFIRM, $event);

        $userManager->updateUser($user);

        if (null === $response = $event->getResponse()) {
            $url = $this->generateUrl('fos_user_registration_confirmed');
            $response = new RedirectResponse($url);
        }

        $dispatcher->dispatch(FOSUserEvents::REGISTRATION_CONFIRMED, new FilterUserResponseEvent($user, $request, $response));

        return $response;
    }

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     * @throws AccessDeniedException
     *
     * Tell the user his account is now confirmed
     */
    public function confirmedAction()
    {
        $user = $this->getUser();
        if (!is_object($user) || !$user instanceof UserInterface) {
            throw new AccessDeniedException('This user does not have access to this section.');
        }

        return $this->render('FOSUserBundle:Registration:confirmed.html.twig', array(
            'user' => $user,
        ));
    }

    /**
     * @param User $user
     */
    protected function createWallet(User $user)
    {
        /* @var $em \Doctrine\ORM\EntityManager */
        $em = $this->container->get('doctrine')->getManager();

        $wallet = new Wallet();
        $wallet->setUser($user);
        $em->persist($wallet);

        $purchaseWallet = new PurchaseWallet();
        $purchaseWallet->setUser($user);
        $em->persist($purchaseWallet);

        $wallet = new SurveyWalletBalance();
        $wallet->setUser($user);
        $em->persist($wallet);

        $wallet = new SurveyWalletAvailableBalance();
        $wallet->setUser($user);
        $em->persist($wallet);
    }

    /**
     * @param User $user
     */
    protected function createPaymentAccount(User $user)
    {
        /* @var $em \Doctrine\ORM\EntityManager */
        $em = $this->container->get('doctrine')->getManager();

        $paymentMethods = $em->getRepository('BuxWalletBundle:PaymentMethod')->findAll();
        foreach ($paymentMethods as $paymentMethod) {
            $userAccount = new UserPaymentAccount();
            $userAccount->setUser($user);
            $userAccount->setPaymentMethod($paymentMethod);
            $em->persist($userAccount);
        }
    }

    /**
     * @return User|null
     */
    public function getSponsor()
    {
        /* @var $entityManager \Doctrine\ORM\EntityManager */
        $entityManager = $this->container->get('doctrine')->getManager();

        $session = $this->container->get('session');
        if ($session->get('referral')) {
            $sponsor = $entityManager->getRepository('BuxUserBundle:User')
                ->findOneBy(array(
                    'username' => $session->get('referral')
                ));

            if ($sponsor) {
                $membership = $sponsor->getMembership();
                $limit = $membership->getRefLimit();
                $referrals = $entityManager->getRepository('BuxUserBundle:User')->findBy(array(
				    'sponsor' => $sponsor
				));

                if ($limit > count($referrals)) {
                    return $sponsor;
                } else {
                    return null;
                }
            }
        }

        return null;
    }

    /**
     * @return \Bux\UserBundle\Entity\Membership
     */
    public function getFreeMembership()
    {
        /* @var $entityManager \Doctrine\ORM\EntityManager */
        $entityManager = $this->container->get('doctrine')->getManager();
        $membership = $entityManager->getRepository('BuxUserBundle:Membership')->find(1);

        return $membership;
    }

    /**
     * @param User $user
     */
    public function setCredits(User $user)
    {
        /* @var $em \Doctrine\ORM\EntityManager */
        $em = $this->container->get('doctrine')->getManager();
        $membership = $user->getMembership();
        $credits = new VideoCredits();
        $credits->setUser($user);
        $em->persist($credits);
        $credits = new PollCredits();
        $credits->setUser($user);
        $em->persist($credits);

        $credits = new AutoSerfCredits();
        $credits->setUser($user);
        $credits->setCredits($membership->getAutosurfCredits());
        $em->persist($credits);

        $credits = new BannerCredits();
        $credits->setUser($user);
        $credits->setCredits($membership->getBannerCredits());
        $em->persist($credits);

        $credits = new BigBannerCredits();
        $credits->setUser($user);
        $credits->setCredits($membership->getVipBannerCredits());
        $em->persist($credits);
    }

    /**
     * Tell the user to check his email provider
     */
    public function checkEmailAction()
    {
        $email = $this->get('session')->get('fos_user_send_confirmation_email/email');
        $this->get('session')->remove('fos_user_send_confirmation_email/email');
        $user = $this->get('fos_user.user_manager')->findUserByEmail($email);

        if (null === $user) {
            throw new NotFoundHttpException(sprintf('The user with email "%s" does not exist', $email));
        }

        return $this->render('FOSUserBundle:Registration:checkEmail.html.twig', array(
            'user' => $user,
        ));
    }
}