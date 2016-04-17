<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 12/26/14
 * Time: 4:14 PM
 */

namespace Bux\Admin\HomeBundle\DataFixtures\ORM;

use Bux\Admin\HomeBundle\Entity\AdminPermission;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

/**
 * Class LoadAdminPermissionData
 *
 * @package Bux\Admin\HomeBundle\DataFixtures\ORM
 */
class LoadAdminPermissionData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
//        $date = new \DateTime('NOW');
//
//        $adminPermission = new AdminPermission();
//        $adminPermission->setUser($this->getReference('admin'));
//        $manager->persist($adminPermission);
//
//        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 5;
    }
}