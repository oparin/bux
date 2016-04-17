<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/20/15
 * Time: 4:38 PM
 */

namespace Bux\OfficeBundle\Twig;

use Bux\UserBundle\Entity\User;
use Doctrine\ORM\EntityManager;

/**
 * Class BigBannerExtension
 *
 * @package Bux\OfficeBundle\Twig
 */
class BigBannerExtension  extends \Twig_Extension
{
    private $em;

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
            new \Twig_SimpleFilter('big_banner', array($this, 'getBanner')),
        );
    }

    /**
     * @param User $user
     *
     * @return mixed
     */
    public function getBanner()
    {
        $qb = $this->em->getRepository('BuxAdvertiseBundle:BigBannerAd')->createQueryBuilder('ba');
        $qb
//            ->join('ba.memberships', 'm')
//            ->join('ba.countries', 'c')
            ->where('ba.pause = 0')
            ->andWhere('ba.validate = 1')
//            ->andWhere('m.id = :membership')
//            ->andWhere('c.code = :country')
            ->andWhere('ba.credits >= 4');
//            ->setParameter('membership', $user->getMembership())
//            ->setParameter('country', $user->getCountry());

        $banners = $qb->getQuery()->getResult();

        if ($banners) {
            $key = rand(0, count($banners) - 1);
            $banners[$key]->setViews($banners[$key]->getViews() + 1 );
            $banners[$key]->setCredits($banners[$key]->getCredits() - 4);

            $this->em->flush();

            return $banners[$key];
        }

        return null;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'big_banner_extension';
    }
}