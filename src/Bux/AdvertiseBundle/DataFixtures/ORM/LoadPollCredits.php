<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/12/15
 * Time: 5:34 PM
 */

namespace Bux\AdvertiseBundle\DataFixtures\ORM;

use Bux\AdvertiseBundle\Entity\PollCredits;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

/**
 * Class LoadPollCredits
 *
 * @package Bux\AdvertiseBundle\DataFixtures\ORM
 */
class LoadPollCredits extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
//        $credits = new PollCredits();
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