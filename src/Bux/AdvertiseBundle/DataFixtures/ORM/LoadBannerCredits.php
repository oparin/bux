<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/23/15
 * Time: 4:01 PM
 */

namespace Bux\AdvertiseBundle\DataFixtures\ORM;

use Bux\AdvertiseBundle\Entity\BannerCredits;
use Bux\AdvertiseBundle\Entity\BigBannerCredits;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

/**
 * Class LoadBannerCredits
 *
 * @package Bux\AdvertiseBundle\DataFixtures\ORM
 */
class LoadBannerCredits extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
//        $credits = new BannerCredits();
//        $credits->setUser($this->getReference('user'));
//        $credits->setCredits(0);
//        $manager->persist($credits);
//
//        $credits = new BigBannerCredits();
//        $credits->setUser($this->getReference('user'));
//        $credits->setCredits(0);
//        $manager->persist($credits);
//
//        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 8;
    }
}