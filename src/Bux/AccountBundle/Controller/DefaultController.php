<?php

namespace Bux\AccountBundle\Controller;

use Bux\UserBundle\Entity\User;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer;
use Symfony\Component\Serializer\Serializer;

/**
 * Class DefaultController
 *
 * @package Bux\AccountBundle\Controller
 */
class DefaultController extends Controller
{
    /**
     * @return array
     *
     * @Route("/", name="office_account")
     * @Template("BuxAccountBundle:Default:index.html.twig")
     */
    public function indexAction()
    {
        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();
        $ref = $em->getRepository('BuxUserBundle:User')->findBy(array(
            'sponsor'   => $this->getUser()
        ));

        $directReferrals = count($ref);

        $transfer = null;

        $date = new \DateTime();

        $settings = $em->getRepository('BuxAdminAdvertisementsBundle:PollGeneralSettings')->find(1);
        $days = $settings->getTransferPeriod();
        $date->modify('-' . $days . ' days');

        $qb = $em->getRepository('BuxStatisticBundle:PollCompleteStatistic')->createQueryBuilder('os');
        $qb
            ->where('os.user = :user')
            ->andWhere('os.date < :date')
            ->setParameter('user', $this->getUser())
            ->setParameter('date', $date);

        $ads = $qb->getQuery()->getResult();
        if ($ads) {
            $transfer = true;
        }

        return array(
            'direct_referrals' => $directReferrals,
            'transfer'  => $transfer
        );
    }

    /**
     * @return Response
     *
     * @Route("/get-my-income", name="office_get_my_income")
     */
    public function getIncomeAction()
    {
        $user = $this->getUser();

        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();

        $today = new \DateTime();
        $today->modify('-5day');
        $yesterday = new \DateTime();
        $yesterday->modify('-6 day');
        $statistic = array();

        $qb = $em->getRepository('BuxStatisticBundle:UserIncomeStatistic')->createQueryBuilder('uis');
        $qb
            ->select('uis.date AS label', 'SUM(uis.sum) AS value')
            ->where('uis.user = :user')
            ->andWhere("uis.date >= '" . $yesterday->format('Y-m-d') . "'")
            ->andWhere("uis.date < '" . $today->format('Y-m-d') . "'")
            ->setParameter('user', $user);
        $ads = $qb->getQuery()->getArrayResult();

        if ($ads[0]['label']) {
            foreach ($ads as &$ad) {
                $ad['label'] = $ad['label']->format('d/m');
                $statistic[] = $ad;
            }
        } else {
            $statistic[] = array('label' => $yesterday->format('d/m'), 'value' => 0);
        }

        $yesterday->modify('+1 day');
        $today->modify('+1 day');
        $qb = $em->getRepository('BuxStatisticBundle:UserIncomeStatistic')->createQueryBuilder('uis');
        $qb
            ->select('uis.date AS label', 'SUM(uis.sum) AS value')
            ->where('uis.user = :user')
            ->andWhere("uis.date >= '" . $yesterday->format('Y-m-d') . "'")
            ->andWhere("uis.date < '" . $today->format('Y-m-d') . "'")
            ->setParameter('user', $user);
        $ads = $qb->getQuery()->getArrayResult();

        if ($ads[0]['label']) {
            foreach ($ads as &$ad) {
                $ad['label'] = $ad['label']->format('d/m');
                $statistic[] = $ad;
            }
        } else {
            $statistic[] = array('label' => $yesterday->format('d/m'), 'value' => 0);
        }
//
        $today->modify('+1 day');
        $yesterday->modify('+1 day');
        $qb = $em->getRepository('BuxStatisticBundle:UserIncomeStatistic')->createQueryBuilder('uis');
        $qb
            ->select('uis.date AS label', 'SUM(uis.sum) AS value')
            ->where('uis.user = :user')
            ->andWhere("uis.date >= '" . $yesterday->format('Y-m-d') . "'")
            ->andWhere("uis.date < '" . $today->format('Y-m-d') . "'")
            ->setParameter('user', $user);
        $ads = $qb->getQuery()->getArrayResult();

        if ($ads[0]['label']) {
            foreach ($ads as &$ad) {
                $ad['label'] = $ad['label']->format('d/m');
                $statistic[] = $ad;
            }
        } else {
            $statistic[] = array('label' => $yesterday->format('d/m'), 'value' => 0);
        }

        $today->modify('+1 day');
        $yesterday->modify('+1 day');
        $qb = $em->getRepository('BuxStatisticBundle:UserIncomeStatistic')->createQueryBuilder('uis');
        $qb
            ->select('uis.date AS label', 'SUM(uis.sum) AS value')
            ->where('uis.user = :user')
            ->andWhere("uis.date >= '" . $yesterday->format('Y-m-d') . "'")
            ->andWhere("uis.date < '" . $today->format('Y-m-d') . "'")
            ->setParameter('user', $user);
        $ads = $qb->getQuery()->getArrayResult();

        if ($ads[0]['label']) {
            foreach ($ads as &$ad) {
                $ad['label'] = $ad['label']->format('d/m');
                $statistic[] = $ad;
            }
        } else {
            $statistic[] = array('label' => $yesterday->format('d/m'), 'value' => 0);
        }

        $today->modify('+1 day');
        $yesterday->modify('+1 day');
        $qb = $em->getRepository('BuxStatisticBundle:UserIncomeStatistic')->createQueryBuilder('uis');
        $qb
            ->select('uis.date AS label', 'SUM(uis.sum) AS value')
            ->where('uis.user = :user')
            ->andWhere("uis.date >= '" . $yesterday->format('Y-m-d') . "'")
            ->andWhere("uis.date < '" . $today->format('Y-m-d') . "'")
            ->setParameter('user', $user);
        $ads = $qb->getQuery()->getArrayResult();

        if ($ads[0]['label']) {
            foreach ($ads as &$ad) {
                $ad['label'] = $ad['label']->format('d/m');
                $statistic[] = $ad;
            }
        } else {
            $statistic[] = array('label' => $yesterday->format('d/m'), 'value' => 0);
        }

        $today->modify('+1 day');
        $yesterday->modify('+1 day');
        $qb = $em->getRepository('BuxStatisticBundle:UserIncomeStatistic')->createQueryBuilder('uis');
        $qb
            ->select('uis.date AS label', 'SUM(uis.sum) AS value')
            ->where('uis.user = :user')
            ->andWhere("uis.date >= '" . $yesterday->format('Y-m-d') . "'")
            ->andWhere("uis.date < '" . $today->format('Y-m-d') . "'")
            ->setParameter('user', $user);
        $ads = $qb->getQuery()->getArrayResult();

        if ($ads[0]['label']) {
            foreach ($ads as &$ad) {
                $ad['label'] = $ad['label']->format('d/m');
                $statistic[] = $ad;
            }
        } else {
            $statistic[] = array('label' => $yesterday->format('d/m'), 'value' => 0);
        }

        $yesterday->modify('+1 day');
        $qb = $em->getRepository('BuxStatisticBundle:UserIncomeStatistic')->createQueryBuilder('uis');
        $qb
            ->select('uis.date AS label', 'SUM(uis.sum) AS value')
            ->where('uis.user = :user')
            ->andWhere("uis.date >= '" . $yesterday->format('Y-m-d') . "'")
            ->setParameter('user', $user);
        $ads = $qb->getQuery()->getArrayResult();

        if ($ads[0]['label']) {
            foreach ($ads as &$ad) {
                $ad['label'] = $ad['label']->format('d/m');
                $statistic[] = $ad;
            }
        } else {
            $statistic[] = array('label' => $yesterday->format('d/m'), 'value' => 0);
        }

        $data = array(
            'chart' => array(
                "caption"=> "Your Income",
//                "subCaption"=> "Last year",
                "xAxisName"=> "Date",
                "yAxisName"=> "Income",
//                "numberPrefix"=> "$",
                "showBorder"=> "1",
                "borderColor"=> "#666666",
                "borderThickness"=> "2",
                "borderAlpha"=> "80",
                "theme"=> "fint"
            ),
            'data'  => $statistic
        );

        $encoders = array(new XmlEncoder(), new JsonEncoder());
        $normalizers = array(new GetSetMethodNormalizer());
        $serializer = new Serializer($normalizers, $encoders);
        $jsonContent = $serializer->serialize($data, 'json');

        $response = new Response();
        $response->headers->set('Content-type', 'application/json');
        $response->setContent($jsonContent);

        return $response;
    }

    /**
     * @return Response
     *
     * @Route("/get-referral-income", name="office_get_referral_income")
     */
    public function getReferralIncomeAction()
    {
        $user = $this->getUser();

        /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();

        $today = new \DateTime();
        $today->modify('-5day');
        $yesterday = new \DateTime();
        $yesterday->modify('-6 day');
        $statistic = array();

        $qb = $em->getRepository('BuxStatisticBundle:UserIncomeStatistic')->createQueryBuilder('uis');
        $qb
            ->select('uis.date AS label', 'SUM(uis.sum) AS value')
            ->join('uis.user', 'u')
            ->where('u.sponsor = :user')
            ->andWhere("uis.date >= '" . $yesterday->format('Y-m-d') . "'")
            ->andWhere("uis.date < '" . $today->format('Y-m-d') . "'")
            ->setParameter('user', $user);
        $ads = $qb->getQuery()->getArrayResult();

        if ($ads[0]['label']) {
            foreach ($ads as &$ad) {
                $ad['label'] = $ad['label']->format('d/m');
                $statistic[] = $ad;
            }
        } else {
            $statistic[] = array('label' => $yesterday->format('d/m'), 'value' => 0);
        }

        $yesterday->modify('+1 day');
        $today->modify('+1 day');
        $qb = $em->getRepository('BuxStatisticBundle:UserIncomeStatistic')->createQueryBuilder('uis');
        $qb
            ->select('uis.date AS label', 'SUM(uis.sum) AS value')
            ->join('uis.user', 'u')
            ->where('u.sponsor = :user')
            ->andWhere("uis.date >= '" . $yesterday->format('Y-m-d') . "'")
            ->andWhere("uis.date < '" . $today->format('Y-m-d') . "'")
            ->setParameter('user', $user);
        $ads = $qb->getQuery()->getArrayResult();

        if ($ads[0]['label']) {
            foreach ($ads as &$ad) {
                $ad['label'] = $ad['label']->format('d/m');
                $statistic[] = $ad;
            }
        } else {
            $statistic[] = array('label' => $yesterday->format('d/m'), 'value' => 0);
        }
//
        $today->modify('+1 day');
        $yesterday->modify('+1 day');
        $qb = $em->getRepository('BuxStatisticBundle:UserIncomeStatistic')->createQueryBuilder('uis');
        $qb
            ->select('uis.date AS label', 'SUM(uis.sum) AS value')
            ->join('uis.user', 'u')
            ->where('u.sponsor = :user')
            ->andWhere("uis.date >= '" . $yesterday->format('Y-m-d') . "'")
            ->andWhere("uis.date < '" . $today->format('Y-m-d') . "'")
            ->setParameter('user', $user);
        $ads = $qb->getQuery()->getArrayResult();

        if ($ads[0]['label']) {
            foreach ($ads as &$ad) {
                $ad['label'] = $ad['label']->format('d/m');
                $statistic[] = $ad;
            }
        } else {
            $statistic[] = array('label' => $yesterday->format('d/m'), 'value' => 0);
        }

        $today->modify('+1 day');
        $yesterday->modify('+1 day');
        $qb = $em->getRepository('BuxStatisticBundle:UserIncomeStatistic')->createQueryBuilder('uis');
        $qb
            ->select('uis.date AS label', 'SUM(uis.sum) AS value')
            ->join('uis.user', 'u')
            ->where('u.sponsor = :user')
            ->andWhere("uis.date >= '" . $yesterday->format('Y-m-d') . "'")
            ->andWhere("uis.date < '" . $today->format('Y-m-d') . "'")
            ->setParameter('user', $user);
        $ads = $qb->getQuery()->getArrayResult();

        if ($ads[0]['label']) {
            foreach ($ads as &$ad) {
                $ad['label'] = $ad['label']->format('d/m');
                $statistic[] = $ad;
            }
        } else {
            $statistic[] = array('label' => $yesterday->format('d/m'), 'value' => 0);
        }

        $today->modify('+1 day');
        $yesterday->modify('+1 day');
        $qb = $em->getRepository('BuxStatisticBundle:UserIncomeStatistic')->createQueryBuilder('uis');
        $qb
            ->select('uis.date AS label', 'SUM(uis.sum) AS value')
            ->join('uis.user', 'u')
            ->where('u.sponsor = :user')
            ->andWhere("uis.date >= '" . $yesterday->format('Y-m-d') . "'")
            ->andWhere("uis.date < '" . $today->format('Y-m-d') . "'")
            ->setParameter('user', $user);
        $ads = $qb->getQuery()->getArrayResult();

        if ($ads[0]['label']) {
            foreach ($ads as &$ad) {
                $ad['label'] = $ad['label']->format('d/m');
                $statistic[] = $ad;
            }
        } else {
            $statistic[] = array('label' => $yesterday->format('d/m'), 'value' => 0);
        }

        $today->modify('+1 day');
        $yesterday->modify('+1 day');
        $qb = $em->getRepository('BuxStatisticBundle:UserIncomeStatistic')->createQueryBuilder('uis');
        $qb
            ->select('uis.date AS label', 'SUM(uis.sum) AS value')
            ->join('uis.user', 'u')
            ->where('u.sponsor = :user')
            ->andWhere("uis.date >= '" . $yesterday->format('Y-m-d') . "'")
            ->andWhere("uis.date < '" . $today->format('Y-m-d') . "'")
            ->setParameter('user', $user);
        $ads = $qb->getQuery()->getArrayResult();

        if ($ads[0]['label']) {
            foreach ($ads as &$ad) {
                $ad['label'] = $ad['label']->format('d/m');
                $statistic[] = $ad;
            }
        } else {
            $statistic[] = array('label' => $yesterday->format('d/m'), 'value' => 0);
        }

        $yesterday->modify('+1 day');
        $qb = $em->getRepository('BuxStatisticBundle:UserIncomeStatistic')->createQueryBuilder('uis');
        $qb
            ->select('uis.date AS label', 'SUM(uis.sum) AS value')
            ->join('uis.user', 'u')
            ->where('u.sponsor = :user')
            ->andWhere("uis.date >= '" . $yesterday->format('Y-m-d') . "'")
            ->setParameter('user', $user);
        $ads = $qb->getQuery()->getArrayResult();

        if ($ads[0]['label']) {
            foreach ($ads as &$ad) {
                $ad['label'] = $ad['label']->format('d/m');
                $statistic[] = $ad;
            }
        } else {
            $statistic[] = array('label' => $yesterday->format('d/m'), 'value' => 0);
        }

        $data = array(
            'chart' => array(
                "caption"=> "Referral Income",
//                "subCaption"=> "Last year",
                "xAxisName"=> "Date",
                "yAxisName"=> "Income",
//                "numberPrefix"=> "$",
                "showBorder"=> "1",
                "borderColor"=> "#666666",
                "borderThickness"=> "2",
                "borderAlpha"=> "80",
                "theme"=> "fint"
            ),
            'data'  => $statistic
        );

        $encoders = array(new XmlEncoder(), new JsonEncoder());
        $normalizers = array(new GetSetMethodNormalizer());
        $serializer = new Serializer($normalizers, $encoders);
        $jsonContent = $serializer->serialize($data, 'json');

        $response = new Response();
        $response->headers->set('Content-type', 'application/json');
        $response->setContent($jsonContent);

        return $response;
    }

    /**
     * @Route("/transfer-survey-balance", name="transfer_balance")
     */
    public function transferSurveyBalanceAction()
    {
	    /* @var $em EntityManager */
        $em = $this->getDoctrine()->getManager();

        /* @var $user User */
        $user = $this->getUser();

        $sum = $user->getSurveyWalletAvailableBalance()->getSum();
		//dump($sum);exit;
        $wallet = $user->getWallet();
        $wallet->setSum($wallet->getSum() + $sum);
        $user->getSurveyWalletAvailableBalance()->setSum(0);
        $em->flush();

        return $this->redirect($this->generateUrl('office_account'));
    }
}