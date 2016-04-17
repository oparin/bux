<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/30/15
 * Time: 4:09 PM
 */

namespace Bux\Admin\UtilitiesBundle\DataFixtures\ORM;

use Bux\Admin\UtilitiesBundle\Entity\BotGeneralSettings;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

/**
 * Class LoadBotGeneralSettings
 *
 * @package Bux\Admin\UtilitiesBundle\DataFixtures\ORM
 */
class LoadBotGeneralSettings extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
        $setting = new BotGeneralSettings();
        $setting->setClickValue(0.006);
        $setting->setVideoValue(0.006);
        $setting->setPollValue(0.006);
        $setting->setRentOption(0);
        $manager->persist($setting);

        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 6;
    }
}