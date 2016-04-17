<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/20/15
 * Time: 11:29 AM
 */

namespace Bux\OfficeBundle\Twig;

use Bux\UserBundle\Entity\User;
use Doctrine\ORM\EntityManager;

/**
 * Class BannerExtension
 *
 * @package Bux\OfficeBundle\Twig
 */
class BannerExtension extends \Twig_Extension
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
            new \Twig_SimpleFilter('banner', array($this, 'getBanner')),
        );
    }

    /**
     * @param User $user
     *
     * @return mixed
     */
    public function getBanner()
    {
        $qb = $this->em->getRepository('BuxAdvertiseBundle:BannerAd')->createQueryBuilder('ba');
        $qb
//            ->join('ba.memberships', 'm')
//            ->join('ba.countries', 'c')
            ->where('ba.pause = 0')
            ->andWhere('ba.validate = 1')
//            ->andWhere('m.id = :membership')
//            ->andWhere('c.code = :country')
            ->andWhere('ba.credits > 0');
//            ->setParameter('membership', $user->getMembership())
//            ->setParameter('country', $user->getCountry());

        $banners = $qb->getQuery()->getResult();

        if ($banners) {
            $banner = array();
            $key = rand(0, count($banners) - 1);
            $banners[$key]->setViews($banners[$key]->getViews() + 1 );
            $banners[$key]->setCredits($banners[$key]->getCredits() - 1);
            $banner[] = $banners[$key];
            unset($banners[$key]);
            sort($banners);

            if ($banners) {
                $key = rand(0, count($banners) - 1);
                $banners[$key]->setViews($banners[$key]->getViews() + 1 );
                $banners[$key]->setCredits($banners[$key]->getCredits() - 1);
                $banner[] = $banners[$key];
                unset($banners[$key]);
                sort($banners);

                if ($banners) {
                    $key = rand(0, count($banners) - 1);
                    $banners[$key]->setViews($banners[$key]->getViews() + 1 );
                    $banners[$key]->setCredits($banners[$key]->getCredits() - 1);
                    $banner[] = $banners[$key];
                    unset($banners[$key]);
                    sort($banners);

                    if ($banners) {
                        $key = rand(0, count($banners) - 1);
                        $banners[$key]->setViews($banners[$key]->getViews() + 1 );
                        $banners[$key]->setCredits($banners[$key]->getCredits() - 1);
                        $banner[] = $banners[$key];
                        unset($banners[$key]);
                        sort($banners);
                    }
                }
            }
            $this->em->flush();

            return $banner;
        }

        return null;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'banner_extension';
    }
}