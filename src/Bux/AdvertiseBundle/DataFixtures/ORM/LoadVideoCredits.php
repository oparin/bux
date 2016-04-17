<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/12/15
 * Time: 5:32 PM
 */

namespace Bux\AdvertiseBundle\DataFixtures\ORM;

use Bux\AdvertiseBundle\Entity\VideoCredits;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

/**
 * Class LoadVideoCredits
 *
 * @package Bux\AdvertiseBundle\DataFixtures\ORM
 */
class LoadVideoCredits extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
//        $credits = new VideoCredits();
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