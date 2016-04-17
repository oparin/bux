<?php
/**
 * Created by PhpStorm.
 * User: oparin
 * Date: 1/14/15
 * Time: 9:58 PM
 */

namespace Bux\AdvertiseBundle\DataFixtures\ORM;

use Bux\AdvertiseBundle\Entity\Country;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Intl\Intl;

/**
 * Class LoadCountryData
 *
 * @package Bux\AdvertiseBundle\DataFixtures\ORM
 */
class LoadCountryData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $countries = Intl::getRegionBundle()->getCountryNames('en');
//        var_dump($countries);exit;
        foreach ($countries as $key => $value) {
            $country = new Country();
            $country->setCode($key);
            $country->setName($value);
            $manager->persist($country);
            $this->setReference('country_' . $key, $country);
        }

        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 1;
    }
}