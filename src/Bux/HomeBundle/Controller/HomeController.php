<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 12/17/14
 * Time: 11:44 AM
 */

namespace Bux\HomeBundle\Controller;

use Bux\HomeBundle\Form\Type\ContactFormType;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class HomeController
 *
 * @package Bux\HomeBundle\Controller
 */
class HomeController extends Controller
{
    /**
     * @return array
     *
     * @Route("/", name="home")
     * @Template("BuxHomeBundle:Home:index.html.twig")
     */
    public function indexAction()
    {
        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();

        $home = $em->getRepository('BuxAdminSetupBundle:StaticPage')->findOneBy(array(
            'name'  => 'home_page'
        ));

        return array(
            'home_page' => $home->getContent()
        );
    }

    /**
     * @return array
     *
     * @Route("/advertise", name="home_advertise")
     * @Template("BuxHomeBundle:Home:advertise.html.twig")
     */
    public function advertiseAction()
    {
        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();

        $video = $em->getRepository('BuxAdminAdvertisementsBundle:VideoPackages')->findAll();
        $poll = $em->getRepository('BuxAdminAdvertisementsBundle:PollPackages')->findAll();
        $autosurf = $em->getRepository('BuxAdminAdvertisementsBundle:AutoSerfPackages')->findAll();
        $banner = $em->getRepository('BuxAdminAdvertisementsBundle:BannerPackages')->findAll();

        return array(
            'video' => $video,
            'poll' => $poll,
            'autosurf' => $autosurf,
            'banner' => $banner,
        );
    }

    /**
     * @param Request $request
     *
     * @return array
     *
     * @Route("/contact", name="home_contact")
     * @Template("BuxHomeBundle:Home:contact.html.twig")
     */
    public function contactAction(Request $request)
    {
        $form = $this->createForm(new ContactFormType());

        if ($request->isMethod('POST')) {
            $form->handleRequest($request);
            if ($form->isValid()) {
                $email = $form->get('email')->getData();
                if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    $text = $form->get('text')->getData();

                    $mailer = $this->get('mailer');

                    $message = $mailer->createMessage()
                        ->setSubject('Bux Contact')
                        ->setFrom($email)
                        ->setTo($this->container->getParameter('admin_email'))
                        ->setBody($text);
                    $mailer->send($message);

                    $this->get('session')->getFlashBag()->add(
                        'success',
                        'Message sent successfully!'
                    );

                    return $this->redirect($this->generateUrl('home_contact'));

                } else {
                    $form->get('email')->addError(new FormError('Wrong e-mail address'));
                }
            }
        }

        return array(
            'form'  => $form->createView()
        );
    }

    /**
     * @return array
     *
     * @Route("/earn-money", name="home_earn_money")
     * @Template("BuxHomeBundle:Home:earn_money.html.twig")
     */
    public function earnMoneyAction()
    {
        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();

        $qb = $em->getRepository('BuxAdvertiseBundle:VideoAd')->createQueryBuilder('v');
        $qb
            ->setMaxResults(6);
        $video = $qb->getQuery()->getResult();

        $qb = $em->getRepository('BuxAdvertiseBundle:PollAd')->createQueryBuilder('v');
        $qb
            ->setMaxResults(6);
        $poll = $qb->getQuery()->getResult();

        return array(
            'video' => $video,
            'poll'  => $poll,
        );
    }

    /**
     * @return array
     *
     * @Route("/testimonials", name="home_testimonials")
     * @Template("BuxHomeBundle:Home:testimonials.html.twig")
     */
    public function testimonialsAction()
    {
        $em = $this->getDoctrine()->getManager();
        $page = $em->getRepository('BuxAdminSetupBundle:StaticPage')->findOneBy(array(
            'name'  => 'testimonials'
        ));

        return array(
            'page'  => $page->getContent()
        );
    }

    /**
     * @return array
     *
     * @Route("/faq", name="home_faq")
     * @Template("BuxHomeBundle:Home:faq.html.twig")
     */
    public function faqAction()
    {
        $em = $this->getDoctrine()->getManager();
        $page = $em->getRepository('BuxAdminSetupBundle:StaticPage')->findOneBy(array(
            'name'  => 'faq'
        ));

        return array(
            'page'  => $page->getContent()
        );
    }

    /**
     * @return array
     *
     * @Route("/about", name="home_about")
     * @Template("BuxHomeBundle:Home:faq.html.twig")
     */
    public function aboutAction()
    {
        $em = $this->getDoctrine()->getManager();
        $page = $em->getRepository('BuxAdminSetupBundle:StaticPage')->findOneBy(array(
            'name'  => 'about'
        ));

        return array(
            'page'  => $page->getContent()
        );
    }

    /**
     * @return array
     *
     * @Route("/terms", name="home_terms")
     * @Template("BuxHomeBundle:Home:faq.html.twig")
     */
    public function termsAction()
    {
        $em = $this->getDoctrine()->getManager();
        $page = $em->getRepository('BuxAdminSetupBundle:StaticPage')->findOneBy(array(
            'name'  => 'terms'
        ));

        return array(
            'page'  => $page->getContent()
        );
    }
}