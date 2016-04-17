<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 3/5/15
 * Time: 4:08 PM
 */

namespace Bux\HomeBundle\Twig;

use Doctrine\ORM\EntityManager;

/**
 * Class VisitorExtension
 *
 * @package Bux\HomeBundle\Twig
 */
class VisitorExtension extends \Twig_Extension
{
    protected $em;

    /**
     * @param EntityManager $manager
     */
    public function __construct(EntityManager $manager)
    {
        $this->em = $manager;
    }

    /**
     * @return array
     */
    public function getFilters()
    {
        return array(
            new \Twig_SimpleFilter('visitor', array($this, 'getVisitors')),
        );
    }

    /**
     * @param string $name
     *
     * @return string
     */
    public function getVisitors($name)
    {
        $qb = $this->em->getRepository('BuxUserBundle:User')->createQueryBuilder('u');
        $qb
            ->select('u.country AS flag', 'u.username AS name', 'c.name AS country')
//            ->select('u.country AS flag', 'u.username AS name')
            ->from('BuxAdvertiseBundle:Country', 'c')
            ->where("u.roles <> :admin")
            ->andWhere('u.country = c.code')
            ->andWhere('u.membership = :membership')
            ->orderBy('u.id', 'DESC')
            ->setParameter('admin', serialize(array('ROLE_ADMIN')))
            ->setParameter('membership', 1)
            ->setMaxResults(500);
        $users = $qb->getQuery()->getResult();
//        dump($users);exit;
//        foreach ($users as $user) {
//            $exist = $this->em->getRepository('BuxAdvertiseBundle:Country')->findOneBy(array(
//                'code'  => $user['flag']
//            ));
//            if (!$exist) {
//                dump($user);exit;
//            }
//        }
//        dump($users);exit;
//        $qb = $this->em->getRepository('BuxAdvertiseBundle:Country')->createQueryBuilder('c');
//        $qb
//            ->select('c.code AS code', 'c.name AS name');
//        $countries = $qb->getQuery()->getResult();
//        dump($countries);exit;

        foreach ($users as &$user) {
            $user['flag']  = strtolower($user['flag']) . '.png';
        }

        $visitors = array();

        $visitors['visit'] = $users;

        $qb = $this->em->getRepository('BuxUserBundle:User')->createQueryBuilder('u');
        $qb
            ->select('u.country AS flag', 'u.username AS name', 'c.name AS country')
            ->from('BuxAdvertiseBundle:Country', 'c')
            ->where("u.roles <> :admin")
            ->andWhere('u.country = c.code')
            ->andWhere('u.membership <> :membership')
            ->orderBy('u.id', 'DESC')
            ->setParameter('admin', serialize(array('ROLE_ADMIN')))
            ->setParameter('membership', 1)
            ->setMaxResults(500);
        $users = $qb->getQuery()->getResult();

        foreach ($users as &$user) {
            $user['flag']  = strtolower($user['flag']) . '.png';
        }

        $visitors['registr'] = $users;

//        dump($visitors);exit;

//
//
//        for ($i = 0; $i < 20; $i++) {
//            $country = $countries[rand(0, count($countries) - 1)];
//            $visitors['registr'][$i]['flag'] = strtolower($country['code']) . '.png';
//            $visitors['registr'][$i]['country'] = $country['name'];
//            $visitors['registr'][$i]['name'] = $nicks[rand(0, count($nicks) - 1)];
//        }

//                dump($visitors);exit;

        return $visitors;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'visitor_extension';
    }
}